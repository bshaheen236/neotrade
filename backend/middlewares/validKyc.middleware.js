const validate = require('../middlewares/validation.middleware');
const { body } = require('express-validator');

module.exports = validate([
  body('fName').isAlpha().withMessage('First Name is required'),
  body('lName').isAlpha().withMessage('Last Name is requried'),
  body('sName').isAlpha().withMessage('Spouse Name is requried'),
  body('email').isEmail().withMessage('invalid email address'),
  body('phone').isMobilePhone().withMessage('invalid mobile number'),
  body('gender')
    .matches(
      /(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say)$/,
    )
    .withMessage('gender is required'),
  body('maritalStatus').isAlpha().withMessage('maritalStatus is requried'),
  body('city').isAlpha().withMessage('city is requried'),
  body('pin')
    .matches(/^(\d{4}|\d{6})$/)
    .withMessage('pincode is required'),
  body('aadharNumber')
    .matches(
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
    )
    .withMessage('Aadhar card is requried'),
  body('panCard')
    .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)
    .withMessage('pancard is required'),
]);
