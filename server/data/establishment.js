var mongoose = require("mongoose");

var establishmentSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: String,
    description: String,
});

module.exports = mongoose.model("establishment", establishmentSchema);