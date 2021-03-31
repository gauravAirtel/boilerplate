"use strict";

module.exports = {
    "logging": {
        "label": "EXAMPLE",
        "newrelic": false
    },
    "database": {
        "mongo": {
            "host": "localhost",
            "port": "27017",
            "user": process.env.MONGO_MASTER_USERNAME,
            "password": process.env.MONGO_MASTER_PASSWORD,
            "database": process.env.DATABASE_NAME,
            "connectionLimit": 10
        },
        "mysqlMaster": {
            "host": "localhost",
            "port": "3306",
            "user": process.env.MYSQL_MASTER_USERNAME,
            "password": process.env.MYSQL_MASTER_PASSWORD,
            "database": process.env.DATABASE_NAME,
            "connectionLimit": 10
        },
        "mysqlSlave": {
            "host": "localhost",
            "port": "3306",
            "user": process.env.MYSQL_SLAVE_USERNAME,
            "password": process.env.MYSQL_SLAVE_PASSWORD,
            "database": process.env.DATABASE_NAME,
            "connectionLimit": 10
        },
        "redis": {
            "host": "localhost",
            "port": "6379",
            "switch": false,
            "keyPrefix": {
                "user": "USER:SOCKETID:"
            }
        }
    },
    "elasticSearch": {
        "host": "10.0.12.195",
        "port": "9200"
    },
    "jwtConfig": {
        "user": {
            "tokenLife": "30 days",
            "RedisTokenLife": 2592000,
            "secret": process.env.USER_JWT_SECRET
        },
        "admin": {
            "tokenLife": "30 days",
            "RedisTokenLife": 2592000,
            "secret": process.env.ADMIN_JWT_SECRET
        }
    },
    "socket": {
        "options": {
            "serveClient": false,
            "pingInterval": 10000,
            "pingTimeout": 5000,
            "cookie": false
        }
    }
}