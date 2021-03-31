const jwt = require('../../services/jwtService');
const constants = require('../constants');
const exception = require('../../core/exceptions');
const commonUtils = require('../../utils/common');


function jwtAuthentication(req, res, next) {
  const userType = req.headers['user-type'];
  const userTypeArr = Object.values(constants.APP_USER_TYPE);
  const isWhitelisted = constants.WHITELIST_PATH.includes(req.url);


  /**
     * @description For whitlisted paths jwt tokens are not required.
     * Some public paths (isWhitelisted) are defined in constants for which authentication 
     * is not required.
     */
  if (isWhitelisted) return next();

  /**
     * @description {Check-1} user-type existance check.
     * user-type must exixts in header otherwise it will return with exception.
     */
  if (!userType) return next(exception('MISSING_USER_TYPE'));

  /**
    * @description {Check-2} invalid user-type check.
    */
  if (!userTypeArr.includes(userType)) return next(exception('INVALID_USER_TYPE'));

  const token = req.body.token || req.query.token || req.headers['token'];
  const jwtConfig = commonUtils.getConfig(userType);

  /**
    * @description {Check-3} Token Existance check.
    */
  if (!token) return next(exception('TOKEN_NOT_FOUND'));


  /**
     * @description {Check-4} This function will verify the given token is valid or not.
     * It also verify the token validity via redis.If any exception accurs it will return 
     * with the exception.
     */
  jwt.verify(token, jwtConfig.secret)
      .then((decoded) => {
        req.decoded = decoded;
        next();
      })
      .catch((error) => {
        next(error);
      });
}

module.exports = jwtAuthentication;
