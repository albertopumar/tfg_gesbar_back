var mongoose = require("mongoose");
// mongoose.set('debug', true);

var Establishment = require("../data/establishment");
var User = require("../data/user");
var _ = require("underscore");

var router = require("express").Router();
router.route("/establishment/:id?").get(getEstablishments).post(addEstablishments);

// TODO: List establishments
// TODO: Get one stablishment by id
function getEstablishments(req, res) {
    // req.params.id
    // req.user
    if(req.params.id) {
        Establishment.find(function (err, establishment) {
            if (err)
                res.send(err);
            else
                res.json(establishment);
        });
    } else {
        res.json(req.user.establishment);
    }
}

// TODO: Add establishment
function addEstablishments(req, res) {
    var establishment = new Establishment(_.extend({"owner": req.user._id}, req.body));
    establishment.save(function (err) {
        if (err) res.send(err);
        else {
            req.user.username = 'test';
            req.user.establishments.push(establishment._id);
            req.user.save(function (err) {
                if (err) res.send(err);
                else res.json(req.user);

            });

        }
    });


}

// TODO: Edit establishment by id


// TODO: Delete establishment by id


module.exports = router;