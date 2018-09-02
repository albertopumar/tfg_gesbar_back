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
    status: {
        type: String,
        default: 'pending'
    },
    deliveryDate: {
        type: Date
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
            },
            name: {
                type: String
            },
            options: {
                type: Object
            }
        }
    ],
    totalPrice : {
        type: Number,
        default: 0
    },
    establishment: {type: mongoose.Schema.Types.ObjectId, ref: 'establishment'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

Order.pre('save', function (next) {
    let self = this;

    async.map(this.products, function (productItem, next) {
        self.totalPrice += productItem.price * productItem.quantity;

        Product.findOne({_id: productItem.product}, function (err, product) {
                productItem.price = product.price;
                productItem.menu = product.menu;
                productItem.name = product.name;
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
