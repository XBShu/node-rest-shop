const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message: "orders were fetched"
    });
});

//status code 201 is returned to indicate that something was succesfully created
router.post('/', (req,res,next) =>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
    }
    res.status(201).json({
        message: "Order was created",
        order: order,
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