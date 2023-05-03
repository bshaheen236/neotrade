const router = require('express').Router();
const { addProduct, findProductByCategoryName,UpdatePrice } = require('../controllers/productController');

router.post('/addproduct', addProduct);
router.get('/getproduct/:category', findProductByCategoryName);
router.put('/updateprice/:id', UpdatePrice)

module.exports = router;
