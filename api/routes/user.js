const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req,res,next) => {
    //check if user already exists
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length >= 1) return res.status(409).json({message: "email already exists"});
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{ //bcrypt is asynchronous 
                if(err) {
                    console.log(err);
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
                        console.log(`${err}`)
                        res.status(500).json({error: err});
                    })
                }
            })
        }
    }).catch();
});

router.post('/login', (req,res,next) => {
    //find user by email
    User.find({email: req.body.email}).exec().then(user => { //returns an array of matching emails (should only be one)
        if(user.length < 1) {
            return res.status(401).json({ //using 404 opens it for brute force attacks
                message: "Auth failed",
            })
        }
        //if email valid
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({ //using 404 opens it for brute force attacks
                    message: "Auth failed",
                }) 
            } 
            if(result) {
                //web token
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                });
            }
            res.status(401).json({ //using 404 opens it for brute force attacks
                message: "Auth failed",
            })
        })
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId}.exec().then(result => {
        res.status(200).json({message: "user deleted"});
    }).catch(err => {
        res.status(500).json({error: err});
    }));
})

module.exports = router;