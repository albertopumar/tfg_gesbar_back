var Order = require("../data/order");

var _ = require("underscore");


var router = require("express").Router();
router.route("/orders/").get(getOrders).post(addOrder);


function getOrders(req, res) {
    // TODO: Check is the owner is the authorized user

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


module.exports = router;