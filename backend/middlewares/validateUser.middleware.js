const validate = require('../middlewares/validation.middleware');
const { body } = require('express-validator');

module.exports = validate([
    body('fname').isLength({ min: 3, max: 10 }).isAlpha().withMessage('first name should be alphabet'),
    body('lname').isLength({ min: 3, max: 10 }).isAlpha().withMessage('last name should be alphabet'),
    body('email').isEmail().withMessage('invalid email address'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).withMessage('password is must be above 8 letters'),
    body('phone').isMobilePhone().withMessage('invalid mobile number')
]);

module.exports = validate([
    body('email').isEmail().withMessage('invalid email address'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).withMessage('password is must be above 8 letters'),
])

module.exports = validate([
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).withMessage('Password is must be above 8 letters'),
])

module.exports = validate([
    body('email').isEmail().withMessage('invalid email address'),
])
