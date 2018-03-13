var mongoose = require("mongoose");

var establishmentSchema = mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model("establishment", establishmentSchema);