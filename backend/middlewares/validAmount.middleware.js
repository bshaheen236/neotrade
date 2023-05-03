const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');

module.exports = validate([
  body('amount')
    .isNumeric()
    .withMessage('amount must be numeric & should not be contains letter'),
]);
