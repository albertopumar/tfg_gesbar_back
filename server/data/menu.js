var mongoose = require("mongoose");

var Menu = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    establishment: { type: mongoose.Schema.Types.ObjectId, ref: 'establishment' },
});

module.exports = mongoose.model('menu', Menu);
