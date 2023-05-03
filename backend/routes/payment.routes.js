const { orders, verify,paymentDetails } = require('../controllers/paymentController');

const router = require('express').Router();

router.post('/order', orders);
router.post('/verify', verify);
router.post('/paymentdetails', paymentDetails);

module.exports = router;
