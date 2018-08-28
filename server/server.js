var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var passport = require('passport');
var cors = require('cors');

//Express request pipeline
var app = express();
app.use(bodyParser.json());
app.use(cors());

// Passport
app.use(passport.initialize());
require('./auth/auth');

var oauth2 = require('./auth/oauth2');
app.post('/oauth/token', oauth2.token);

var register = require('./controllers/registerController');
app.use('/register', register);

app.get('/api/userInfo',
    passport.authenticate('owner', { session: false }),
    function(req, res) {
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
);

// Routes
const ownerController = require("./controllers/ownerController");
app.use('/api/V1/owner', passport.authenticate('owner', { session: false }), ownerController);

const menuController = require("./controllers/menuController");
app.use('/api/V1/owner', passport.authenticate('owner', { session: false }), menuController);

const productController = require("./controllers/productController");
app.use('/api/V1/owner', passport.authenticate('owner', { session: false }), productController);


const establishmentEvent = require("./controllers/establishmentEvent");
app.use('/api/V1/events', passport.authenticate('owner', { session: false }), establishmentEvent);




const orderController = require("./controllers/orderController");
app.use('/api/V1/', passport.authenticate(['user', 'owner'], { session: false }), orderController);

const establishmentController = require("./controllers/establishmentController");
app.use('/api/V1/', passport.authenticate('user', { session: false }), establishmentController);


// Port listening
app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

// Start mongodb
mongoose.connect("mongodb://localhost/gestionbar");