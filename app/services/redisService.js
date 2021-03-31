"use strict";

const redis = require('redis');
const config = require('../config');
const logger = require('../core/logger');

class RedisCache {
    constructor() {
        this.connectionDetails = {
            host: config.database.redis.host,
            port: config.database.redis.port
        };
        this.clientRef = this.getClient(this.connectionDetails);
    }

    getClient(options) {
        const client = redis.createClient(options);
        client.on('error', function (error) {
            logger.error(error.message);
        });
        return client;
    };

    set(key, data, options = {}) {
        return new Promise((resolve, reject) => {
            if (options.ttl) {
                this.clientRef.set(key, data, 'EX', options.ttl, function (err, data) {
                    if (err) return reject(err);
                    return resolve(data);
                });
            }
            this.clientRef.set(key, data, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.clientRef.get(key, function (err, data) {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }
}

module.exports = (new RedisCache);
