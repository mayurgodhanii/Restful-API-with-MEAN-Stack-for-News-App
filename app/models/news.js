var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var NewsSchema = new Schema({
    category_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    short_desc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    created: {
        type: String,
        required: false
    },
    modiifed: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('News', NewsSchema);