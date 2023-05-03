const { getBankDetails } = require('../controllers/ifscController');

const router = require('express').Router();

router.post('/getbankdetails', getBankDetails);

module.exports = router;
    