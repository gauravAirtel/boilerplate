"use strict";

const exception = require('../../core/exceptions');
const commonUtils = require('../../utils/common');
const constants = require('../constants');
const jwt = require('../../services/jwtService');


module.exports = function (socket, next) {

    if (!socket.handshake.query || !socket.handshake.query.token) {
        return next(exception("TOKEN_NOT_FOUND"));
    }

    if (!socket.handshake.query.type) {
        return next(exception('MISSING_USER_TYPE'));
    }

    const userType = socket.handshake.query.type;
    const token = socket.handshake.query.token;
    const userTypeArr = Object.values(constants.APP_USER_TYPE);

    if (!userTypeArr.includes(userType)) return next(exception('INVALID_USER_TYPE'));
    const jwtConfig = commonUtils.getConfig(userType);

    /**
       * @description {Check-4} This function will verify the given token is valid or not.
       * It also verify the token validity via redis.If any exception accurs it will return 
       * with the exception.
       */
    jwt.verify(token, jwtConfig.secret)
        .then((decoded) => {
            socket.decoded = decoded;
            return next();
        })
        .catch((error) => {
            next(error);
        });
}