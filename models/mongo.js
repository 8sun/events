var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var event_schema = new Schema({
    id: Number,
    title: String,
    info: String,
    snippet: String,
    text: String,
    status: Boolean,
    start: mongoose.Schema.Types.Date,
    icon: String,
});

var subscribe_schema = new Schema({
    email: { type: String, unique: true},
    event_id: Number,
    user_id: String,
    img: String,
    name: String,
    inTheme: Boolean,
    created: mongoose.Schema.Types.Date
});

var comment_schema = new Schema({
    event_id: Number,
    user_id: String,
    img: String,
    name: String,
    comment_text: String,
    created: mongoose.Schema.Types.Date
});

var token_schema = new Schema({
    email: String,
    token: String,
    created: mongoose.Schema.Types.Date
});

mongoose.Promise = global.Promise;

exports.event = mongoose.model('event', event_schema);
exports.subscribe = mongoose.model('subscribe', subscribe_schema);
exports.comment = mongoose.model('comment', comment_schema);
exports.token = mongoose.model('token', token_schema);
