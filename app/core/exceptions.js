"use strict";

const exceptionsObj = {
	AUTHENTICATION_ERROR: {
		status: 401,
		message: 'Authentication Failed',
		statusCode: 'authenticationError'
	},
	INVALID_EMAIL_ID: {
		status: 401,
		message: 'Email id is not valid.',
		statusCode: 'authenticationError'
	}
}


module.exports = (exceptionType) => exceptionsObj[exceptionType];