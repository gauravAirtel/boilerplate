"use strict";

/**
 *@description Error Handler
 */
exports.errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: err.response || {},
    statusCode: err.statusCode || 'unexpectedError',
    message: err.message,
    data: null
  });
};


exports.validationErrors = (err) => {
  const errors = this.parseValidationErrors(err);
  const obj = {};
  obj['data'] = null;
  obj['message'] = 'Validation error';
  obj['statusCode'] = 'VALIDATION_ERROR';
  obj['error'] = errors || {};
  return obj;
};


/**
 *@description Modify the error format.
 */
exports.parseValidationErrors = function (errors) {
  const errorObject = {};
  errors.forEach((elem) => {
    errorObject[elem.field || 'default'] = elem.message;
  });
  return errorObject;
};
