var mongoose = require("mongoose");
var Product = require("./product");
var async = require('async');

var Order = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    },
    products: [
        {
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number
            },
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'product',
                required: true
            }
        }
    ],
    establishment: {type: mongoose.Schema.Types.ObjectId, ref: 'establishment'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

Order.pre('save', function (next) {
    async.map(this.products, function (productItem, next) {
        Product.findOne({_id: productItem.product}, function (err, product) {
                productItem.price = product.price;
                productItem.menu = product.menu;
                next(err, productItem);
        });
    }, function (err, result) {
        const menusId = result.map(a => a.menu.toString());
        const uniqueIds = [ ...new Set(menusId)];
        if(uniqueIds.length > 1) err = new Error('All products must belong to the same menu');
        next(err, result);
    });

});

module.exports = mongoose.model('order', Order);
