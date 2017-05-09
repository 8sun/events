var {event} = require('../models/mongo');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function (req, res, next) {
	if (req.params.id && isNumeric(req.params.id)) {

		var is = event.count({id : req.params.id});
		is.then(function(response) {
			if (response > 0) {
				res.render('event', { title: 'Events. The easy service to share your events', message: 'Welcome!'})
			} else {
				next();
			}
		});

	} else {
		next();
	}
}