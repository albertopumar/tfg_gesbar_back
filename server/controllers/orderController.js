var Order = require("../data/order");
var Menu = require("../data/menu");
var Product = require("../data/product");

var _ = require("underscore");


var router = require("express").Router();
router.route("/orders/").get(getOrders).post(addOrder);
router.route("/submitOrder/:establishment_id").get(getMenus);
router.route("/order/:order_id/update").get(updateOrder);


function getOrders(req, res) {
    // TODO: Check is the owner is the authorized user
    if(req.user.type === 'owner') {
        Order.find({establishment: {$in: req.user.establishments}, status: req.query.status}, function (err, order) {
            if (err) res.send(err);
            else res.json(order);
        });
    }else {
        if (req.query.status) {
            Order.find({user: req.user._id, status: req.query.status}, function (err, order) {
                if (err) res.send(err);
                else res.json(order);
            });
        } else {
            Order.find({user: req.user._id, status: {$ne: 'pending'}}, function (err, order) {
                if (err) res.send(err);
                else res.json(order);
            });
        }
    }
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
        res.status(400).send({message: 'You must specify an id'});
    }
}

function updateOrder(req, res) {
    if(req.user.type === 'owner') {
        Order.update({_id: req.params.order_id}, {status: req.query.status}, function (err, order) {
            if (err)
                res.send(err);
            else
                res.json(order);
        });
    } else {
        res.status(400).send({message: 'You must specify an id'});
    }
}


module.exports = router;