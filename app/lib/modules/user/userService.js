"use strict";

const msqlUserDao = new (require('../../dao/mysql/userDao'));
const constants = require('../../../core/constants');
const userHelper = require('./userHelper');
const exceptions = require('../../../core/exceptions');
const commonUtils = require('../../../utils/common');
const jwtService = require('../../../services/jwtService');
const logger = require('../../../core/logger');


/**
 * @description Create a new user
 * @param {Json} body 
 */
async function signup(body) {
	try {
		const user = await msqlUserDao.getUser({ mobile: body.mobile });
		if (user.length) throw exceptions('MOBILE_ALREADY_REGISTERD');
		const userObj = userHelper.getUserSignupObject(body);
		const userData = await msqlUserDao.signup(userObj);
		return userData;
	} catch (error) {
        logger.error(`Error in [user][service][signup] = ${commonUtils.logMsg(error)}`);
		throw error;
	}
}


/**
 * @description User signin
 * @param {Json} body 
 */
async function signin(body) {
	try {
		let user = await msqlUserDao.getUser({ mobile: body.mobile });
		if (!user.length) throw exceptions('MOBILE_NOT_FOUND');
		user = user[0];

		// compare password
		if (!commonUtils.comparePass(body.password, user.password)) {
			throw exceptions('INVALID_PASSWORD');
		}

		// Created jwt token
		const jwtObj = userHelper.getJwtTokenObject(user);
		const token = await jwtService.createToken(jwtObj, constants.APP_USER_TYPE.USER);
		const response = userHelper.getSigninResponseData(token, user);
		return response;
	} catch (error) {
        logger.error(`Error in [user][service][signin] = ${commonUtils.logMsg(error)}`);
		throw error;
	}
}


/**
 * @description Get all users
 */
async function getUsers() {
	try {
		const users = await mongoUserDao.getUsers({});
		return users;
	} catch (e) {
		throw e;
	}
}

module.exports = {
	signup,
	signin,
	getUsers,
};
