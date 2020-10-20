const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',(req,res,next) => {
    Order.find().exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

//status code 201 is returned to indicate that something was succesfully created
router.post('/', (req,res,next) =>{

    Product.findById(req.body.productId)
        .then(product => { 
            if(!product) { //if findById returns null, no such product exists
                return res.status(404).json({message: 'product not found'});
            }
            //else create a new order object
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                productId: req.body.productId,
            });
            //save to database
            return order.save(); //return save instead of chaining with then() to avoid too much nesting

        }).then(result => {
            res.status(200).json({message: 'order created', orderId: result.id, productId: result.productId, quantity: result.quantity});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'error', error: err});
        });
});

router.get('/:orderId', (req,res,next) =>{
    Order.findById(req.params.orderId).exec().then(order => {
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
});

router.delete('/:orderDelete', (req,res,next) => {
    Order.remove({_id: req.params.orderDelete}).exec().then(result => {
        res.status(200).json({message: 'order deleted'});
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;