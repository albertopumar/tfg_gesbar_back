var mongoose = require("mongoose");
var User = require("./data/user");
var Client = require("./data/client");


var user = new User({
    username: "andrey",
    password: "simplepassword"
});
user.save();

var client = new Client({
    name: "OurService iOS client v1",
    clientId: "mobileV1",
    clientSecret:"abc123456"
});
client.save();