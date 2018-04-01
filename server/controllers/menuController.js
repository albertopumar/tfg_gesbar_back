var Establishment = require("../data/establishment");
var Menu = require("../data/menu");

var _ = require("underscore");



var router = require("express").Router();
router.route("/establishment/:establishment_id/menu/:menu_id?").get(getMenus).post(addMenu).put(editMenu).delete(removeMenu);

// TODO: add route? -> Menus associated with user

// TODO: add menu items?
// router.route("/establishment/menu/:menu_id/items/:item_id?").get(getMenuItems).post(addMenuItems).put(editMenuItems).delete(removeMenuItems);


function getMenus(req, res) {
    // TODO: Check is the owner is the authorized user

    if(req.params.menu_id) {
        Menu.find({_id: req.params.menu_id}, function (err, menu) {
            if (err)
                res.send(err);
            else
                res.json(menu);
        });
    } else {
        Menu.find({establishment: req.params.establishment_id}, function (err, menu) {
            if (err)
                res.send(err);
            else
                res.json(menu);
        });
    }
}

function addMenu(req, res) {
    // TODO: Check is the owner is the authorized user
    // TODO: Add menu object attribute
    var menu = new Menu(_.extend({"establishment": req.params.establishment_id}, req.body));

    menu.save(function (err) {
        if (err) res.send(err);
        else {
            Establishment.findOneAndUpdate({_id: req.params.establishment_id}, {'$push': {'menus': menu._id}}, function (err, updated_establishment) {
                if (err) res.send(err);
                else res.json(updated_establishment);
            });
        }
    });
}

function editMenu(req, res) {
    // TODO: Check is the owner is the authorized user
    if (!req.params.menu_id)
        res.status(400).send({ error: 'You must specify an id' });
    else
        Menu.findOneAndUpdate({_id: req.params.menu_id}, req.body, function (err, updated_menu) {
            if (err) res.send(err);
            else res.json(updated_menu);
        });
}

function removeMenu(req, res) {
    // TODO: Check is the owner is the authorized user
    if (!req.params.menu_id)
        res.status(400).send({ error: 'You must specify an id' });
    else
        Establishment.findOneAndRemove({_id: req.params.menu_id}, function (err, removed) {
            if (err) res.send(err);
            else res.json(removed);
        });
}


module.exports = router;