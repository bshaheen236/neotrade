const {
  postGold,
  getGold,
  postSilver,
  getSilver,
  getGoldPrice,
  getSilverPrice,
  updateGold
} = require('../controllers/newtradeController');

const router = require('express').Router();

router.get('/getgold', getGold);
router.post('/postgold', postGold);
router.get('/getgoldprice', getGoldPrice);
router.put('/editgold/:id', updateGold);

router.get('/getsilver', getSilver);
router.post('/postsilver', postSilver);
router.get('/getsilverprice', getSilverPrice);

module.exports = router;
