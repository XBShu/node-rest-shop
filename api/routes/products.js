const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const multer = require('multer');


//multer lets you adjust how files are stored
const storage = multer.diskStorage({
    //destination is a function
    destination: function(req,file,cb){
        cb(null, './uploads/');
    },  
    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

//custom filter for uploading files
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    //reject file otherwise
    cb(null, false);
};

//store all files folder or location of choosing
//limit file size to 5MB
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter, //custom filter created earlier 
    }); 


//not "/products" because the route was already specified in app.js
router.get('/', ProductsController.get_all_products);

//use checkAuth middleware we created
router.post('/', checkAuth,  upload.single('productImage'), ProductsController.post_product);

router.get('/:productId', ProductsController.get_by_id);

router.patch('/:productId', checkAuth, ProductsController.patch_product);

router.delete('/:productId', checkAuth, ProductsController.delete);

module.exports = router;