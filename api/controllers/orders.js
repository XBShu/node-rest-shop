const Order = require('../models/order');


exports.orders_get_all = (req,res,next) => {
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