var Establishment = require("../data/establishment");
var Menu = require("../data/menu");
var Product = require("../data/product");

var _ = require("underscore");

var router = require("express").Router();
router.route("/establishment/:establishment_id/menu/:menu_id/items/:item_id?").get(getMenuItems).post(addMenuItems).put(editMenuItem).delete(removeMenuItem);

function getMenuItems(req, res) {
    if (!req.params.menu_id) {
        res.status(400).send({message: 'You must specify an id'});
    }


    if (req.params.item_id) {

    } else {
        Product.find({menu: req.params.menu_id}, function (err, menu) {
            if (err)
                res.send(err);
            else
                res.json(menu);
        });
    }
}

function addMenuItems(req, res) {
    var product = new Product(_.extend({"menu": req.params.menu_id}, req.body));

    product.save(function (err) {
        if (err) res.send(err);
        else {
            res.json(product);
        }
    });
}

function editMenuItem(req, res) {
    if (!req.params.item_id)
        res.status(400).send({ error: 'You must specify an id' });
    else
        Product.findOneAndUpdate({_id: req.params.item_id}, req.body, function (err, updated_product) {
            if (err) res.send(err);
            else res.json(updated_product);
        });
}

function removeMenuItem(req, res) {
    if (!req.params.item_id)
        res.status(400).send({message: 'You must specify an id'});
    else {
        Product.findOneAndRemove({_id: req.params.item_id}, function (err, removed) {
            if (err) res.send(err);
            else
                res.json(removed);
        });
    }
}

module.exports = router;