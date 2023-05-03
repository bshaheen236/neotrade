const { 
    postGoldData, 
    postSilverData, 
    getSilverApi, 
    getGoldApi,
    getGoldDataByDay, 
    getSilverDataByDay } = require('../controllers/tradeController');

const router = require('express').Router();

router.get('/get-gold-data', getGoldApi);

router.get('/get-silver-data', getSilverApi);

router.get('/get-gold-data-by-day/:day', getGoldDataByDay);

router.get('/get-silver-data-by-day/:day', getSilverDataByDay);

module.exports = router;