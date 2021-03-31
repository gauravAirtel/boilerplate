const exceptionHandler = require('../../../core/handlers/exceptionHandler');
const FastestValidator = require('fastest-validator');
const validator = new FastestValidator();
const constants = require('../../../core/constants');


/**
 * @description used Fastest Validator( https://www.npmjs.com/package/fastest-validator ) 
 * to validate api params.
 */
function signup(req, res, next) {
  const schema = {
    firstName: {
      type: 'string',
      messages: {
        string: constants.VALIDATION_ERRORS.INVALID_NAME,
      },
    },
    lastName: {
      type: 'string',
      messages: {
        string: constants.VALIDATION_ERRORS.INVALID_NAME,
      },
    },
    password: {
      type: 'string',
      min: 6,
      messages: {
        string: constants.VALIDATION_ERRORS.INVALID_PASSWORD,
        required: constants.VALIDATION_ERRORS.REQUIRED_FIELD,
        stringMin: constants.VALIDATION_ERRORS.PASSWORD_TO_SHORT,
      },
    },
    mobile: {
      type: 'string',
      pattern: /^[5-9]\d{9}$/,
      messages: {
        required: constants.VALIDATION_ERRORS.REQUIRED_FIELD,
      },
    },
    $$strict: true,
  };

  const validationResult = validator.validate(req.body, schema);
  if (validationResult === true) return next();
  return res.status(400).json(exceptionHandler.validationErrors(validationResult));
}


/**
 * @description User signin validator.
 */
function signin(req, res, next) {
  const schema = {
    mobile: {
      type: 'string',
      pattern: /^[5-9]\d{9}$/,
      messages: {
        required: constants.VALIDATION_ERRORS.REQUIRED_FIELD,
      },
    },
    password: {
      type: 'string',
      messages: {
        string: constants.VALIDATION_ERRORS.INVALID_PASSWORD,
        required: constants.VALIDATION_ERRORS.REQUIRED_FIELD,
      },
    },
    $$strict: true,
  };

  const validationResult = validator.validate(req.body, schema);
  if (validationResult === true) return next();
  return res.status(400).json(exceptionHandler.validationErrors(validationResult));
}


module.exports = {
  signup,
  signin,
};
