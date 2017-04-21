var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: Number,
    title: String,
    info: String,
    snippet: String,
    text: String,
    status: Boolean,
    //createdAt: mongoose.Schema.Types.Date,
});

var subscribe_schema = new Schema({
    email: String,
    event_id: Number,
    user_id: String,
    img: String,
    name: String,
    inTheme: Boolean,
});

mongoose.Promise = global.Promise;

exports.post = mongoose.model('post', schema);
exports.subscribe = mongoose.model('subscribe', subscribe_schema);