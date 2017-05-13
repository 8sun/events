const {token, subscribe} = require('../models/mongo');

module.exports = function (req, res, next) {
	
	if (!req.query.email || !req.query.token) {
		next();
	}

	const email = req.query.email;
	const _token = req.query.token;

	getToken = () => token.findOne({
		$and: [
		{ 'email' : email },
		{ 'token': _token }
		]
	}).then(function (res, err) {	
		return res;
	});

	getSubscriber = () => subscribe.findOne({'email': email}).then(function (res, err) {	
		return res;
	});

	removeToken = () => token.remove({'email': email}).then(function (res, err) {	
		return res;
	});

	const makeRequest = async () => {
		try {
			const is_token = await getToken();
			
			if (is_token) {
				const remove_token = await removeToken();
				const user = await getSubscriber();
				res.render('recovery', {user : user})
			} else {
				return res.render('about', { title: 'Token is fail', message: 'Your token is wrong'})
			}

		} catch (err) {
			console.log(err);
		}
	}

	return makeRequest();

}