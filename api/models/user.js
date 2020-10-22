const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _ud: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true},
});