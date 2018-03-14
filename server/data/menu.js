var mongoose = require("mongoose");

var Menu = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('menu', Menu);
