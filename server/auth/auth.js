var passport                = require('passport');
var BasicStrategy           = require('passport-http').BasicStrategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var UserModel               = require('../data/user');
var ClientModel             = require('../data/client');
var AccessTokenModel        = require('../data/accessToken');
var RefreshTokenModel       = require('../data/refreshToken');

passport.use(new BasicStrategy(
    function(username, password, done) {
        console.log('basic strategy');
        console.log(username);
        ClientModel.findOne({ clientId: username }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != password) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        console.log('client password strategy');
        console.log(clientId);
        ClientModel.findOne({ clientId: clientId }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != clientSecret) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use('owner', new BearerStrategy(
    function(accessToken, done) {
        AccessTokenModel.findOne({ token: accessToken }, function(err, token) {
            if (err) { return done(err); }
            if (!token) { return done(null, false); }

            if( Math.round((Date.now()-token.created)/1000) > 3600 ) {
                AccessTokenModel.remove({ token: accessToken }, function (err) {
                    if (err) return done(err);
                });
                return done(null, false, { message: 'Token expired' });
            }

            UserModel.findOne({_id: token.userId, type: 'owner'}, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user' }); }

                var info = { scope: 'owner' };
                done(null, user, info);
            });
        });
    }
));