var User = require("../data/user");

var _ = require("underscore");

var router = require("express").Router();
router.route("/").post(registerUser);

function registerUser(req, res) {
    let user = new User(req.body);
    user.save(function (err) {
        if (err) res.send(err);
        else res.json(user);
    });
}

module.exports = router;