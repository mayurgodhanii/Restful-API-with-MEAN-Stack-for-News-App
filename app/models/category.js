var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);