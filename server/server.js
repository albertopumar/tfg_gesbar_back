var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var passport = require('passport');

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());


// Passport
app.use(passport.initialize());
require('./auth/auth');

var oauth2 = require('./auth/oauth2');
app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
);

// Routes
app.get('/apiV1//userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
);


// Port listening
app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

// Start mongodb
mongoose.connect("mongodb://localhost/gestionbar");