const express = require('express');
const { addUser, getUserById, editUser, deleteUser, login, logout, sendpasswordlink, getUsers, regisByEmail,forgotPassword, deleteAllUsers, changePassword, loginByEmail,VrifyOtp,genrateToken,SocialLoginData } = require('../controllers/authController');
const validate = require('../middlewares/validateUser.middleware');
const { auth, authLogout, authPass } = require('../middlewares/auth.middleware');
const router = express.Router();

// registeration routes
router.post('/signup', validate, addUser);

router.get('/getuserbyid/:id', getUserById);
router.get('/getusers', getUsers);
router.put('/edituser/:id',  editUser);
router.delete('/deleteuser/:id', auth, deleteUser);
// router.get('/getuser', getUsers);
// router.delete('/deleteall', deleteAllUsers);

// login routes
router.post('/signin', validate, login);
router.get('/logout', authLogout, logout);

// forget-password routes
// router.post('/sendpasswordlink', validate, sendpasswordlink);
router.post('/sendpasswordlink', sendpasswordlink);
router.get("/forgotpassword/:id/:token", forgotPassword);
router.post('/changepassword/:id/:token/:password', changePassword);

//login with otp mail rout
router.post('/loginbymail', loginByEmail);
router.post('/regisbymail',regisByEmail);
router.post("/varifyotp", VrifyOtp);

router.get('/genratetoken/:token',genrateToken)
router.post('/sociallogindata',SocialLoginData)

module.exports = router;