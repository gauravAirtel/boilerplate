"use strict";

const exception = require('../core/exceptions');
const RedisCache = require('./redisService');
const logger = require('../core/logger');
const jwt = require('jsonwebtoken');
const commonUtils = require('../utils/common');


exports.createToken = async function (tokenObj, createdFor) {
	try {
		const jwtConfig = commonUtils.getConfig(createdFor);
		const token = jwt.sign(tokenObj, jwtConfig.secret, {
			expiresIn: jwtConfig.tokenLife,
		});
		const stringifyToken = JSON.stringify(tokenObj);
		const options = { ttl: jwtConfig.RedisTokenLife };

		// Set token in redis with expiration time.
		await RedisCache.set(token, stringifyToken, options);
		return token;
	} catch (error) {
		logger.error(`Error in [createToken] = ${error}`);
		throw exception('TOKEN_GEN_ERROR');
	}
};


/**
 * @description Verify webtoken
 */
exports.verify = async function (token, secret) {
	try {
		const data = await jwtVerifyPromise(token, secret)
		await redisVerifyPromise(token);
		delete data.iat;
		delete data.exp;
		return data;
	}
	catch (error) {
		logger.error(`Error in [verify] = ${commonUtils.logMsg(error)}`);
		throw error;
	};
};



/**
 *@ ======================== Helpers start =============================>
 */


/**
 * @description Verify JWT token by passing token and secret
 * @param {string} token
 * @param {string} secret
 */
function jwtVerifyPromise(token, secret) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) reject(exception('AUTHENTICATION_ERROR'));
			resolve(decoded);
		});
	});
}


/**
 * @description Verify Token saved in redis or not
 * @param {string} token
 */
async function redisVerifyPromise(token) {
	try {
		const redisData = await RedisCache.get(token);
		if (redisData) return redisData;
		else throw exception('AUTHENTICATION_ERROR');
	} catch (error) {
		logger.error(`Error in [redisVerifyPromise] = ${commonUtils.logMsg(error)}`);
		throw error;
	}
}


/**
* @========================= Helpers end =============================>
*/
