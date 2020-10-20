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

    Product.findById(req.body.productId).then(product => {
        if(!product){
            //use return so that all subsequent code is not executed
            return res.status(404).json({message: 'Product not found'});
        }
    })

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        productId: req.body.productId,
    });

    //no need to use exec on save functions, exec is for queries
    order.save().then(result => {
        res.status(200).json({message: 'order created', orderId : result._id, productId: result.productId, quantity: result.quantity});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err: err});
    });
});

router.get('/:orderId', (req,res,next) =>{
    res.status(201).json({
        message: "Order details",
        orderId: req.params.orderId
    });
});

router.delete('/:orderDelete', (req,res,next) => {
    res.status(200).json({
        message: "Order deleted",
        orderId: req.params.orderDelete
    });
});

module.exports = router;