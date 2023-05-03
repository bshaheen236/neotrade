const {
  addBank,
  deleteBank,
  getBankDetails,
} = require('../controllers/bankdetailController');
const validate = require('../middlewares/validBank.middleware');

const router = require('express').Router();

router.post('/addbank/:id', validate, addBank);
router.get('/getbankdetails/:id', getBankDetails);
router.get('/deletebank/:id/:accId', deleteBank);

module.exports = router;
