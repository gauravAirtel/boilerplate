'use strict';

const config = require('../../config');
// const logger = require('../logger');
const { MongoClient } = require('mongodb');

/**
 * The DB connection variable
 */
console.log(process.env.NODE_ENV);

let mongodbURL;
if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'staging'
) {
  mongodbURL = 'mongodb://' + process.env.DB + '?replicaSet=rs0';
} else {
  mongodbURL =
    'mongodb://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASS +
    '@' +
    process.env.DB +
    '?replicaSet=wynkstageprod';
}

const client = new MongoClient(mongodbURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepAlive: 1,
});

async function clientConnect() {
  try {
    await client.connect();
    console.log('mongodb connected');
  } catch (err) {
    console.log('mongodb connection error: ' + err);
    setTimeout(() => {
      console.log('retrying mongodb connect');
      clientConnect();
    }, 3000);
  }
}

clientConnect();

async function dbConnect() {
  try {
    return client.db(process.env.DB_NAME);
  } catch {
    console.log('Monogdb Connection failed');
  }
}

function dbClose() {
  if (client && client.isConnected()) {
    client.close();
  }
}

module.exports.dbConnect = dbConnect;
module.exports.dbClose = dbClose;
