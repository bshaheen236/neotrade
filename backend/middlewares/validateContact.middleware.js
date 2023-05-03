const validate = require('../middlewares/validation.middleware');
const { body } = require('express-validator');

module.exports = validate([
    // body('fullName').isLength({ min: 3, max: 20 }).isAlpha().withMessage('full name should be alphabet'),
    body('fullName').isString().withMessage('full name should be alphabet'),
    body('email').isEmail().withMessage('invalid email address'),
    body('phone').isMobilePhone().withMessage('invalid mobile number'),
    body('message').isString().isLength({min:10, max : 70}).withMessage('message filled is empty'),
]);