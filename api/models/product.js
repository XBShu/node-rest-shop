const mongoose = require('mongoose');


//define how the product will look like in the database
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //required properties
    name: {type: String, required: true},
    price: {type: Number, required: true}, 
    productImage: {type: String},

    
    //non-required prperty
    not_required: String,
});

//Export the schema wrapped in a model
module.exports = mongoose.model('Product', productSchema);
//Args: conventional name, usually capitalized, and then the variable