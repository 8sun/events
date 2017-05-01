var config = require('../config');

module.exports = function (req, res) {

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
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ?', // plain text body
	    html: '<b>Hello world ?</b>' // html body
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
