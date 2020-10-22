const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://shuxin:'+process.env.MONGOATLASPW +'@cluster0.hfy84.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    //will use mongodb client for connecting
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; //to get rid of DeprecationWarning when removing

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads')); //makes uploads folder available to everyone
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handlings CORS errors (postman doesn't care about CORS errors)
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') { //browser will always send an OPTIONS request first
        res.header('Acess-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next(); //call next at the end of middle ware of there is no return  
});


//Routes handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//Error handling for when no route is able to handle the request
app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
//Hanlde any other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    })
})

module.exports = app;