const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');

module.exports = validate([
  body('name').isString().withMessage('bank name is required'),
  body('accountnumber')
    .matches(/^\d{9,18}$/)
    .withMessage('account number is required'),
  body('ifsc')
    .matches(/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/)
    .withMessage('IFSC code is required'),
]);
