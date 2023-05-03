const {sendBuyinvoice,getUsersInvoices,sendSellinvoice,createInvoice} = require('../controllers/InvoiceController');

const router = require('express').Router();

router.post('/sendbuyinvoice',sendBuyinvoice);
router.post('/sendsellinvoice',sendSellinvoice);
router.get('/getusersinvoices',getUsersInvoices)

module.exports = router;