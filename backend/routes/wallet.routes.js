const router = require('express').Router();
const {
  addAmount,
  viewAmount,
  withdrawAmount,
  getWalletTransaction,
  buyAmount,
  sellAmount,
  walletExport,
  viewAdminWallet
} = require('../controllers/walletController');
const { auth } = require('../middlewares/auth.middleware');
const validAmount = require('../middlewares/validAmount.middleware');

router.post('/withdrawamount/:id', auth, validAmount, withdrawAmount);
router.post('/addamount/:id', auth, validAmount, addAmount);
router.get('/transaction', getWalletTransaction);
router.get('/walletexport', walletExport);
router.get('/viewamount/:id', viewAmount);
router.get('/viewadminwallet', viewAdminWallet);
router.post('/buyamount/:id', buyAmount);
router.post('/sellamount/:id', sellAmount);

module.exports = router;
