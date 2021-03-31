const commonUtils = require('../../../utils/common');


/**
 * @description Create object for user signup.
 * @param {object} data
 * @return object
 */
function getUserSignupObject(data) {
  const password = commonUtils.hashPass(data.password);
  const userObj = Object.assign(data, {
    password: password,
  });
  return userObj;
}


/**
 * @description It will  return the object to create JWT
 * @param {object} data
 * @return object
 */
function getJwtTokenObject(data) {
  const obj = {};
  obj['userId'] = data.id;
  obj['mobile'] = data.mobile;
  return obj;
}

function getSigninResponseData(token, data) {
  const response = {};
  const userData = {
    userId: data.id,
    mobile: data.mobile,
    firstName: data.firstName,
    lastName: data.lastName,
    imageUrl: data.imageUrl
  }
  response["token"] = token;
  response["data"] = userData;
  return response;
}

module.exports = {
  getUserSignupObject,
  getJwtTokenObject,
  getSigninResponseData
};
