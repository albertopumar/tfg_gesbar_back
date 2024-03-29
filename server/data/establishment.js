var mongoose = require("mongoose");

var establishmentSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: {
        type: String,
        required: true
    },
    description: String,
    menu: {type: mongoose.Schema.Types.ObjectId, ref: 'menu'}
});

module.exports = mongoose.model("establishment", establishmentSchema);