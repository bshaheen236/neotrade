const validate = require('../middlewares/validation.middleware');
const { body } = require('express-validator');

module.exports = validate([
    body('quantity')
    .isNumeric({ min: 1, max: 4 })
    .withMessage('quantity should be numeric and minimum value should be >=1 and maximum value <4'),
]);