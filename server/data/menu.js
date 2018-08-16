var mongoose = require("mongoose");

var Menu = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
    establishment: { type: mongoose.Schema.Types.ObjectId, ref: 'establishment' },
    availability: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('menu', Menu);
