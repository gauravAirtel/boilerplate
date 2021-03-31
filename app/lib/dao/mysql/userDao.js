'use strict';

const constants = require('../../../core/constants');
const msqlDb = require('../../../core/dbs/mysql');

class UserDao {
    constructor() {
        this.msqlObj = msqlDb.getInstance();
    }

    getUser(params) {
        const values = [];
        let query = `SELECT * FROM ${constants.TABLES.USERS} where`;
        if (params.mobile) {
            query += ` mobile = ?`;
            values.push(params.mobile);
        }
        if (params.userId) {
            query += ` id = ?`;
            values.push(params.userId);
        }
        return this.msqlObj.query('MASTER', query, values);
    }

    signup(params, transaction = null) {
        let query = `INSERT INTO  ${constants.TABLES.USERS} SET ?`;

        if (transaction) {
            return this.msqlObj.transactionQuery(transaction, query, [params])
        } else {
            return this.msqlObj.query('MASTER', query, [params]);
        }

    }
}


module.exports = UserDao;
