const express = require('express');
const router = express.Router();

//not "/products" because the route was already specified in app.js
router.get('/',(req,res,next) => {
    res.status(200).json({
        message: "handling GET requests to /products"
    });
});

router.post('/',(req,res,next) => {
    res.status(201).json({
        message: "handling POST requests to /products"
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    if(id === "special") {
        res.status(200).json({
            message: 'You discovered the secret ID',
            id
        });
    } else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "updated product"
    });
});

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "deleted product"
    });
});

module.exports = router;