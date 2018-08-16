var Order = require("../data/order");
var Menu = require("../data/menu");
var Product = require("../data/product");

var _ = require("underscore");


var router = require("express").Router();
router.route("/orders/").get(getOrders).post(addOrder);
router.route("/submitOrder/:establishment_id").get(getMenus);


function getOrders(req, res) {
    // TODO: Check is the owner is the authorized user

    Order.find({user: req.user._id}, function (err, order) {
        if (err) res.send(err);
        else res.json(order);
    });
}

function addOrder(req, res) {
    // TODO: Check is the owner is the authorized user
    var order = new Order(_.extend({"user": req.user._id}, req.body));

    order.save(function (err) {
        if (err) res.send(err);
        else {
            res.json(order);
        }
    });
}

function getMenus(req, res) {
    // TODO: Check is the owner is the authorized user

    if (req.params.establishment_id) {
        Menu.findOne({establishment: req.params.establishment_id, availability: true}, function (err, menu) {
            if (err)
                res.send(err);
            else {
                if (!menu) res.json([]);
                else {
                    Product.find({menu: menu._id}, function (err, items) {
                        if (err)
                            res.send(err);
                        else
                            res.json(items);
                    });
                }
            }
        });
    } else {
        res.status(400).send({ error: 'You must specify an id' });
    }
}


module.exports = router;