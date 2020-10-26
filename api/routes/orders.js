const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth,  OrdersController.get_all);

router.post('/', checkAuth, OrdersController.create);

router.get('/:orderId', checkAuth, OrdersController.findById);

router.delete('/:orderDelete', checkAuth, OrdersController.delete);

module.exports = router;