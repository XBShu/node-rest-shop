const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    //ID for order
    _id: mongoose.Schema.Types.ObjectId,

    /*ID of product ordered
    ref refers to the name of the model we want to connect to, in this case "Product"
    */
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    productName: {type: String, ref: 'Product'},
    //default value if no value is provided
    quantity: {type: Number, default: 1},
});

module.exports = mongoose.model('Order', orderSchema);
