const { body } = require('express-validator');

// Validation library guidance: https://github.com/validatorjs/validator.js#validators
module.exports = {
  '/docs/examples/validation/email': [
    body('docsExampleName')
      .not().isEmpty()
      .withMessage('Enter your name'),
  ],
  '/docs/examples/validation/complete': [
    body('docsExampleEmail')
      .isEmail()
      .withMessage('Enter a valid email address'),
  ],
};
