var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');
var UserModel               = require('../data/user');
var ClientModel             = require('../data/client');
var AccessTokenModel        = require('../data/accessToken');
var RefreshTokenModel       = require('../data/refreshToken');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    UserModel.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }

        RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });
        AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
        var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
        refreshToken.save(function (err) {
            if (err) { return done(err); }
        });
        token.save(function (err) {
            if (err) { return done(err); }
            console.log(user);
            console.log(user.username)
            console.log(user.type)
            done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600, type: user.type});
        });
    });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });
            AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('hex');
            var refreshTokenValue = crypto.randomBytes(32).toString('hex');
            var token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
            var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
            refreshToken.save(function (err) {
                if (err) { return done(err); }
            });
            token.save(function (err, token) {
                if (err) { return done(err); }
                done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600, type: user.type});
            });
        });
    });
}));

// Token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];