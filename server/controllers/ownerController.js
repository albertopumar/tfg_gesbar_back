var Establishment = require("../data/establishment");
var _ = require("underscore");



var router = require("express").Router();
router.route("/establishment/:id?").get(getEstablishments).post(addEstablishments).put(editEstablishments).delete(removeEstablishments);

/**
 *
 * @param req
 * @param res
 *
 * Return the list of establishments or only one if id is specified
 */

function getEstablishments(req, res) {
    if(req.params.id) {
        Establishment.find({_id: req.params.id}, function (err, establishment) {
            if (err)
                res.send(err);
            else
                res.json(establishment);
        });
    } else {
        Establishment.find({_id: { $in : req.user.establishments }}, function(err, establishments) {
            if (err)
                res.send(err);
            else
                res.json(establishments);
        });
    }
}

/**
 *
 * @param req
 * @param res
 *
 * Add a establishment associated with his owner. The owner will be the logged user
 */
function addEstablishments(req, res) {
    var establishment = new Establishment(_.extend({"owner": req.user._id}, req.body));
    establishment.save(function (err) {
        if (err) res.send(err);
        else {
            req.user.establishments.push(establishment._id);
            req.user.save(function (err) {
                if (err) res.send(err);
                else res.json(establishment);

            });

        }
    });
}

/**
 *
 * @param req
 * @param res
 *
 * Edit the establishment info passed thought JSON
 */
function editEstablishments(req, res) {
    if (!req.params.id)
        res.status(400).send({ message: 'You must specify an id' });
    else
        Establishment.findOneAndUpdate({_id: req.params.id}, req.body, function (err, updated_establishment) {
            if (err) res.send(err);
            else res.json(updated_establishment);
        });
}

/**
 *
 * @param req
 * @param res
 *
 * Remove the establishment selected by id
 */
function removeEstablishments(req, res) {
    if (!req.params.id)
        res.status(400).send({ message: 'You must specify an id' });
    else
        Establishment.findOneAndRemove({_id: req.params.id}, function (err, removed) {
            if (err) res.send(err);
            else res.json(removed);
        });
}

module.exports = router;