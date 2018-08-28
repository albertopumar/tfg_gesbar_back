var mongoose = require("mongoose");

var Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    options: {
        type: Object
    },
    image: {
        type: String
    },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menu' },
});

module.exports = mongoose.model('product', Product);
