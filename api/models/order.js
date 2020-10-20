const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    //ID for order
    _id: mongoose.Schema.Types.ObjectId,
    /*ID of product ordered
    ref refers to the name of the model we want to connect to, in this case "Product"
    */
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, default: 1},
});

module.exports = mongoose.model('Order', orderSchema);
