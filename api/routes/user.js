const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userController = require('../controllers/users');


router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.delete('/:userId', userController.delete_user);

module.exports = router;