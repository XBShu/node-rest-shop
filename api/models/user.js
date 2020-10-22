const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _ud: mongoose.Schema.Types.ObjectId,
    //unique does NOT validate whether or not emails are unique
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);