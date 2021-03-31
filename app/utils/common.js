const bcrypt = require('bcryptjs');
const config = require('../config');
const constants = require('../core/constants');
const { v4: uuidv4 } = require('uuid');

/**
 * @description Generate hash of the plan password
 */
function hashPass(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hashSync(plainPassword, saltRounds);
}


/**
 * @description Compare plain password (entered by user) and hash(Saved in db) 
 * and return boolead value
 */
function comparePass(plainPassword, hash) {
  return bcrypt.compareSync(plainPassword, hash);
}


/**
 * @description Get users JWT config
 * @param {string} createdFor
 */
function getConfig(createdFor) {
  let jwtConfig;
  switch (createdFor) {
    case constants.APP_USER_TYPE.USER:
      jwtConfig = config.jwtConfig.user;
      break;
    case constants.APP_USER_TYPE.ADMIN:
      jwtConfig = config.jwtConfig.admin;
      break;
  }
  return jwtConfig;
}


/**
 * @description Log messages
 * @param {string} message
 */
function logMsg(message) {
  if (message instanceof Error) return message;
  return JSON.stringify(message);
}


/**
 * returns UUID
 */
function getUUID() {
  return uuidv4()
}


function getUserRedisKey(id) {
  return config.database.redis.keyPrefix.user + id;
}

module.exports = {
  hashPass,
  comparePass,
  getConfig,
  logMsg,
  getUUID,
  getUserRedisKey
};
