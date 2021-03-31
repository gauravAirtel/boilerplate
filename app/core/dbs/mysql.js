'use strict';
// TODO need to add pool connection and timeout for queries.


// const constants = require('../../core/constants');
const config = require('../../config');
const mysql = require('mysql');
const exceptions = require('../../core/exceptions');
let _instance = false;


/** Class representing a database object */
class Database {

    /**
     * Create a Database Object.
     * @function constructor
     * @param {object} instance - The object instance.
     */
    constructor(instance) {

        if (_instance !== instance) {
            throw new Error("Cannot construct class directly");
        }

        this.pool = null;
        this.connectionDetails = {
            MASTER: config.database.mysqlMaster,
            SLAVE: config.database.mysqlSlave,
        };

        this._createPoolConnection();
    }

    /**
     * Create an instance of Database class and return if already initiated
     * @function getInstance
     * @return {Database} A Database object.
     */

    static getInstance() {
        if (!this[_instance]) { // If no instance then make one
            this[_instance] = (new Database(_instance));
        }
        return this[_instance];
    }


    /**
    * Create pool connection 
    * @function _createPoolConnection
    * @return {void}
    */
    _createPoolConnection() {
        this.pool = {
            MASTER: mysql.createPool(this.connectionDetails.MASTER),
            SLAVE: mysql.createPool(this.connectionDetails.SLAVE),
        };
    };


    /**
     * This function performs database query
     * @function query
     * @param {String} connectionName - MASTER | SLAVE
     * @param {String} query - MYSQL QUERY
     * @param {Array} query - DATA
     */

    query(connectionName, query, data) {
        const connectionPoolObj = this.pool[connectionName];
        return new Promise((resolve, reject) => {
            connectionPoolObj.getConnection(function (err, connection) {
                if (err) {
                    return reject(exceptions("MYSQL_DB_CONNECTION_ERROR", err))
                }

                connection.query(query, data, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        return reject(exceptions("MYSQL_QUERY_ERROR", error))
                    }
                    resolve(results);
                });

            });
        })
    }


    connectionPromise() {
        try {
            const connectionPoolObj = this.pool['MASTER'];
            return new Promise((resolve, reject) => {
                connectionPoolObj.getConnection(function (err, connection) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(connection);
                });
            })
        } catch (error) {
            throw error;
        }
    }


    /**
    * @description Start transaction
    * @return {Promise}
    */
    async beginTransactionPromise() {
        try {
            const connection = await this.connectionPromise();
            return new Promise((resolve, reject) => {
                connection.beginTransaction(function (err, data) {
                    if (err) reject(err);
                    resolve(connection);
                });
            });
        } catch (error) {
            throw error;
        }

    };


    /**
     * @description commit transaction
     * @return {Promise}
     */
    commitTransactionPromise(connection) {
        return new Promise((resolve, reject) => {
            connection.commit(function (err, data) {
                if (err) reject(err);
                connection.release();
                resolve(data);
            });
        });
    };


    /**
     * @description rollback transaction
     * @return {Promise}
     */
    rollbackTransactionPromise(connection) {
        return new Promise((resolve, reject) => {
            connection.rollback(function (err, data) {
                if (err) reject(err);
                connection.release();
                resolve(data);
            });
        });
    };


    /**
     * @description Executes Query
     * @param {string} query
     * @param {object | string | Array} data
     * @return {Promise}
     */
    async transactionQuery(connection, query, data) {
        return new Promise((resolve, reject) => {
            connection.query(query, data, function (error, results, fields) {
                if (error) {
                    return reject(exceptions("MYSQL_QUERY_ERROR", error))
                }
                resolve(results);
            });
        })
    };

}

module.exports = Database;