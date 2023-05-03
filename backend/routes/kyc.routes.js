const { postKyc,getKyc } = require('../controllers/kycController');
const router = require('express').Router();
const validate = require("../middlewares/validKyc.middleware");

router.post('/postkyc/:id', validate, postKyc);
router.get('/getkyc/:id', getKyc);

module.exports = router;
