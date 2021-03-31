const middlewares = require('../../core/middlewares');
const user = require('../modules/user');
const chat = require('../modules/chat');
const common = require('../modules/common');
const responseHandler = require('../../core/handlers/responseHandler');
const constants = require('../../core/constants');

module.exports = function(app) {
  /**
  * @description Api intersepter(Not usable yet)
  */
  app.use(middlewares.intercepter);


  // Add more modules like user
  app.use(constants.PATH.USER, user);
  app.use(constants.PATH.CHAT, chat);
  app.use(constants.PATH.COMMON, common);

  app.use(constants.PATH.MONITOR, (req, res) => {
    return res.status(200).json(responseHandler.createRes({response: 'pong'}));
  });
};
