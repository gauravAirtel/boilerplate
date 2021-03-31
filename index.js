/**
 * @description Setting root directory in global
 */
global.rootDir = __dirname;

const http = require('http');
const app = require('./app/app');
const constants = require('./app/core/constants');
const port = process.env.NODE_PORT || constants.DEFAULT.PORT;
const server = http.createServer(app);
const socket = require('./app/services/socket');


/**
 * @description Initialize socket
 */
socket.init(server);

/**
 * @description Listen Server at configured port
 * @event App Listener
 */
server.listen(port, function () {
  console.log(`App started on port ${port}`);
});

/**
 * @description Exporting app for Testing
 */
module.exports = server;
