
const mongoose = require('mongoose');
const Product = require('../models/product');



exports.get_all_products = (req,res,next) => {
    //find all elements if no arg is passed
    Product.find().select('name price _id productImage').exec().then(docs => {
        const response ={
            count: docs.length,
            products: docs.map(doc => {
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id,
                    }
                };
            })
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err + "in routesproducts.js #62");
        res.status(500).json({error: err});
    });
};


exports.post_product = (req,res,next) => {
    //use mongoose to save the new req as a js object
    const product = new Product({ 
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
    });

    //store product in database
    //method by mongoose that can be used on mongoose models
    product.save().then(result => {
        console.log(result);
        res.status(201).json({ //succesful post
            message: "handling POST requests to /products",
            createdProduct: {
                id: result._id,
                name: result.name,
                price: result.price,
                //productImage: result.productImage,
                request: {
                    type: "GET",
                    url:'http://localhost:3000/products/' + result._id,

                }
            }
        });
    }).catch(err => {
        console.log(err + "line 97 in routes/products.js");
        res.status(500).json({error: err});
    }); 
};

exports.get_by_id = (req,res,next) => {
    const id = req.params.productId;
    //find product by ID
    Product.findById(id).select('name price _id productImage')
        .exec().then(doc => {
            console.log('From database',doc);
            if(doc){ //if ID exists
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: 'http://localhost/products'
                    }
                });
            } else{ //if valid ID but not exisiting ID
                res.status(404).json({message: "No valid entry found"});
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err});
    });
};

exports.patch_product = (req,res,next) => {
    //identifier for object we want to update
    const id = req.params.productId;
    const updateOps ={}; //placeholder for new values
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    //First param = identifier for object we want to patch
    Product.update({_id: id}, {$set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: "product updated",
            updated: Object.keys(updateOps), //all updated properties
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id,
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(result);
    });
};

exports.delete = (req,res,next) => {
    const id = req.params.productId;
    //remove all the objects that fulfill criteria _id = id
    Product.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            message: "product deleted",
            request: {
                url: 'http://localhost:3000/products',
                data: {name: 'String', price: 'Number'},
            },
        }); //use result instead of res to avoid conflict with res
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};