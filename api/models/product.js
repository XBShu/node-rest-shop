const mongoose = require('mongoose');

//define how the product will look like in the database
const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number,
});

//Export the schema wrapped in a model
module.exports = mongoose.model();