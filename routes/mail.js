const config = require('../config');
const {token, subscribe} = require('../models/mongo');
const crypto = require('crypto');

// TODO: Token should expire (Check of date)
module.exports = function (req, res, next) {

	if (!req.query.email) {
		next();
	}

	const email = req.query.email;

	getSubscriber = () => subscribe.findOne({'email': email}).then(function (res, err) {	
		return res;
	});

	getToken = () => token.findOne({'email': email}).then(function (res, err) {	
		return res;
	});

	removeToken = () => token.remove({'email': email}).then(function (res, err) {	
		return res;
	});

	const date = Date.now();
	const secret = 'paragraphist' + date;
	const hash = crypto.createHmac('sha256', secret).update(email).digest('hex');
	const e = new token({ email: email, token: hash, created: date });

	makeToken = () => e.save().then(function (ok) {
		console.log(hash);
		return res.send('{"send":true}');
	});

	const makeRequest = async () => {
		try {
			const data = await getSubscriber();
			const is_token = await getToken();
			
			if (data) {
				if(is_token == null) {
					const result = await makeToken();
					return result;
				} else {
					const remove_result = await removeToken();
					const result = await makeToken();
					return result;
				}
			} else {
				return res.send('{"send":false}');
			}

		} catch (err) {
			console.log(err);
		}
	}

	return makeRequest();

	const nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: config.mail
	});

	// setup email data with unicode symbols
	let mailOptions = {
	    from: '"Hello 👻" <lovecraft.crowley@gmail.com>', // sender address
	    to: 'facetowater@gmail.com', // list of receivers
	    subject: 'Hello ✔ Do you want to return on the Events?', // Subject line
	    text: 'It message was sent by request on Events website. Your link to recovery: ' + config.domain +'/recovery?email=' + email + '&token=' + hash + '', // plain text body
	    html: 'It message was sent by request on Events website.<b><a href="' + config.domain +'/recovery?email=' + email + '&token=' + hash +'">Your link to recovery</a></b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.render('about', { title: 'Mail is sent', message: 'Your message has been successfully sent'})
	});
}
