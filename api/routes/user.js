const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', (req,res,next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) =>{ //bcrypt is asynchronous 
        if(err) {
            return res.status(500).json({error: err});
        } else { //if hashing is succesful, create new user
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
            });
            user.save().then(result => {
                res.status(200).json({message: "user created"});
            }).catch(err => {
                res.status(500).json({error: err});
            })
        }
    })
});

module.exports = router;