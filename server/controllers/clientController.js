var User = require("../data/user");
var _ = require("underscore");



var router = require("express").Router();
router.route("/user/:id").get(getUserInfo);


function getUserInfo(req, res) {
    if(req.params.id) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (err)
                res.send(err);
            else
                res.json({name: user.username});
        });
    } else {
        res.status(400).send({ message: 'You must specify an id' });
    }
}

module.exports = router;