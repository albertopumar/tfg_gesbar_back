var Establishment = require("../data/establishment");
var _ = require("underscore");


var router = require("express").Router();
router.route("/establishments/:id?").get(getEstablishments);

/**
 *
 * @param req
 * @param res
 *
 * Return the list of establishments or only one if id is specified
 */

function getEstablishments(req, res) {
    if (req.params.id) {
        Establishment.find({_id: req.params.id}, function (err, establishment) {
            if (err)
                res.send(err);
            else
                res.json(establishment);
        });
    } else {
        const limit = 3;
        let query;
        if (req.query.search)
            query = Establishment.find({name: new RegExp(req.query.search, "i")});
        else
            query = Establishment.find({});

        query.limit(limit);
        query.skip(req.query.page * limit);

        query.exec(function (err, establishments) {
            if (err)
                res.send(err);
            else
                res.json(establishments);
        });
    }
}

module.exports = router;