var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/events');

module.exports = mongoose;