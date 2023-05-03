const router = require('express').Router();
const { Router } = require('express');
const {
  holdingViewGold,
  holdingViewSilver,
  holdingViews,
  sellItem,
  addCart,
  findUserTrade,
  deleteCartItem,
  buyItem,
  updateCart,
  sellOrdersView,
  buyOrdersView,
  sellView,
  buyView,
  exportSellData,
  exportBuyData

} = require('../controllers/macanismControl');
const { auth } = require('../middlewares/auth.middleware');
const validDetails = require('../middlewares/macanism.middleware');

// holding schema
router.post('/tradeViewgold/:id', holdingViewGold);
router.post('/tradeViewsilver/:id', holdingViewSilver);
router.get('/tradeViews/:id', holdingViews);

// buy
router.post('/buy/:id', buyItem);
router.get('/sellordersview/:id',sellOrdersView)
router.get('/sellview/:id',sellView)
router.get('/exportbuydata',exportBuyData)

// sell
router.post('/sell/:id', sellItem);
router.get('/buyordersview/:id',buyOrdersView);
router.get('/buyview/:id',buyView);
router.get('/exportselldata',exportSellData)
// router.post('/sellsilver/:id',  validDetails, sellSilver);

// cart
router.post('/addcart/:id',  validDetails, addCart);
router.get('/findUsertrade/:id', findUserTrade)
router.delete('/deletecart/:id',deleteCartItem)
router.put('/updatecart/:id',updateCart)

module.exports = router;
