var Establishment = require("../data/establishment");
var Menu = require("../data/menu");

var _ = require("underscore");



var router = require("express").Router();
router.route("/establishment/:establishment_id/menu/:menu_id?").get(getMenus).post(addMenu).put(editMenu).delete(removeMenu);

// TODO: add route? -> Menus associated with user

// TODO: add menu items?
// router.route("/establishment/menu/:menu_id/items/:item_id?").get(getMenuItems).post(addMenuItems).put(editMenuItems).delete(removeMenuItems);


function getMenus(req, res) {
    if(req.params.menu_id) {
        Menu.find({_id: req.params.menu_id}, function (err, menu) {
            if (err)
                res.send(err);
            else
                res.json(menu);
        });
    } else {
        // TODO: get menu associated with establishment
    }
}

function addMenu(req, res) {

}

function editMenu(req, res) {

}

function removeMenu(req, res) {

}


module.exports = router;