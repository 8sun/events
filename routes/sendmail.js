const config = require('../config');
const nodemailer = require('nodemailer');
const {
  subscribe
} = require('../models/mongo');
const mailhtml = require('../lib/email');

module.exports = function(req, res, next) {

  // catch

  const event_id = req.body.event_id
  const name = req.body.name

  sendNoteOfSubscribe = email => subscribe.find({
    'event_id': event_id,
    'email': {
      $not: {
        $eq: email
      }
    }
  }).then(function(result, err) {
    invokeSend(result)
  }).catch(console.log)

  sendNoteOfComment = comment => subscribe.find({
    'event_id': event_id
  }).then(function(result, err) {
    invokeSend(result, comment)
  }).catch(console.log)

  invokeSend = (list, comment = null) => {
    list.map(item => {
      item.comment = comment
      send(item, event_id)
    });
    return res.send('{"send":true}')
  }

  if (req.body.comment !== 'null') sendNoteOfComment(req.body.comment)
  else if (req.body.email !== 'null') sendNoteOfSubscribe(req.body.email)

  function send(item, event_id) {

    const {
      email,
      comment
    } = item

    let text = ''
    let html = ''

    if (comment) {
      text = 'The event (' + config.domain + '/event/' + event_id + ') you subscribed for has receive a new comment: /n' + comment + '/nFrom user: ' + name
      //html = '<a href="' + config.domain + '/event/' + event_id + '">The event</a> you subscribed for has receive a new comment: <br>' + comment + '<br>From user: ' + name
      html = mailhtml.comment(item, event_id, config.domain, config.sun.url, name)
    } else {
      text = 'On the event  (' + config.domain + '/event/' + event_id + ') that you subscribed for, user ' + name + ' has been subscribed.'
      //html = 'On <a href="' + config.domain + '/event/' + event_id + '">the event</a> that you subscribed for, user ' + name + ' has been subscribed.'
      html = mailhtml.subscribe(item, event_id, config.domain, config.sun.url, name)
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: config.mail
    })

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Events" <myprettyevents@gmail.com>',
      to: email,
      subject: '✔ Notification of Events',
      text: text,
      html: html
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      //res.render('about', { title: 'Mail is sent', message: 'Your message has been successfully sent'})
    })
  }
}
