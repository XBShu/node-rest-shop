const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//import product schema from the models file
const Product = require('../models/product');


//not "/products" because the route was already specified in app.js
router.get('/',(req,res,next) => {
    //find all elements if no arg is passed
    Product.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/',(req,res,next) => {
    //use mongoose to save the new req as a js object
    const product = new Product({ 
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
    });

    //store product in database
    //method by mongoose that can be used on mongoose models
    product.save().then(result => {
        console.log(result);
        res.status(201).json({ //succesful post
            message: "handling POST requests to /products",
            createdProduct: product,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }); 
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    //find product by ID
    Product.findById(id)
        .exec().then(doc => {
            console.log('From database',doc);
            if(doc){ //if ID exists
                res.status(200).json(doc);
            } else{ //if valid ID but not exisiting ID
                res.status(404).json({message: "No valid entry found"});
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req,res,next) => {
    //identifier for object we want to update
    const id = req.params.productId;
    const updateOps ={}; //placeholder for new values
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    //First param = identifier for object we want to patch
    Product.update({_id: id}, {$set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
});

router.delete('/:productId', (req,res,next) => {
    const id = req.params.productId;
    //remove all the objects that fulfill criteria _id = id
    Product.remove({_id: id}).exec().then(result => {
        res.status(200).json(result); //use result instead of res to avoid conflict with res
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;