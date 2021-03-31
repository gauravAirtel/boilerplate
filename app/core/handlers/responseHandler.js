"use strict";

function createResponse(data) {
  return {
    error: null,
    statusCode: data.statusCode || 'SUCCESS',
    message: data.statusMessage || '',
    data: data.response || {},
  };
}

module.exports = {
  createResponse
}