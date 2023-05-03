const router = require('express').Router();
const { auth } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validateUser.middleware');
const {
  authorizeUser,
  changePassword,
  newUser
} = require('../controllers/adminController');

router.put('/authorizeuser',  authorizeUser);
router.put('/changepassword/:id',  changePassword);
router.post('/newuser', validate, newUser);


module.exports = router;
