const validates = require('../middlewares/validateContact.middleware');
const express = require('express');
const { getContact} = require('../controllers/contactController');
const router = express.Router();

router.post('/info', getContact);

module.exports = router;