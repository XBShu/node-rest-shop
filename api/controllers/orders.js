const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');


exports.get_all = (req,res,next) => {
    //use populate() method to fill in product info, second argument acts like select() method
    Order.find().select('product quantity _id').populate('product','name price _id').exec().then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs,
        });
    }).catch(err => {
        res.status(500).json({error: err});
    });
};

exports.create = (req,res,next) =>{

    Product.findById(req.body.productId)
        .then(product => { 
            if(!product) { //if findById returns null, no such product exists
                return res.status(404).json({message: 'product not found'});
            }
            //else create a new order object
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            //save to database
            return order.save(); //return save instead of chaining with then() to avoid too much nesting

        }).then(result => {
            res.status(200).json({
                message: 'order created', 
                order: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'error', error: err});
        });
};

exports.findById = (req,res,next) =>{
    Order.findById(req.params.orderId).populate('product', 'name price _id').exec().then(order => {
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/',
            },
        });
    }).catch(err => {
        res.status(500).json({error: err});
    });
};

exports.delete = (req,res,next) => {
    Order.remove({_id: req.params.orderDelete}).exec().then(result => {
        res.status(200).json({message: 'order deleted'});
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};