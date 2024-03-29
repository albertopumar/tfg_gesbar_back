var crypto = require('crypto');
var mongoose = require("mongoose");

var User = mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        establishments: [{type: mongoose.Schema.Types.ObjectId, ref: 'establishment'}]
    },
    {
        usePushEach: true
    });

User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });


User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('user', User);
