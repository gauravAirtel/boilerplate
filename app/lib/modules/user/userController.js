"use strict";

const constants = require('../../../core/constants');
const responseHandler = require('../../../core/handlers/responseHandler');
const userService = require('./userService');

async function signup(req, res, next) {
    try {
        await userService.signup(req.body);
        res.json(responseHandler.createRes({
            statusMessage: constants.RESPONSE_MESSAGES.USER_CREATED,
            response: {}
        }));
    } catch (error) {
        next(error);
    }
}


async function signin(req, res, next) {
    try {
        const response = await userService.signin(req.body);
        res.json(responseHandler.createRes({
            statusMessage: constants.RESPONSE_MESSAGES.SIGNIN_SUCCESS,
            response: response,
        }));
    } catch (error) {
        next(error);
    }
}


async function getUsers(req, res, next) {

    // try {
    //     const users = await userService.getUsers({});
    //     res.json(responseHandler.createRes({
    //         statusMessage: constants.RESPONSE_MESSAGES.DATA_FETCHED,
    //         response: users,
    //     }));
    // } catch (e) {
    //     logger.error(`Error in user [getUsers] = ${commonUtils.logMsg(e)}`);
    //     next(e);
    // }
}

module.exports = {
    signup,
    signin,
    getUsers,
};
