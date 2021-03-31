const constant = require('./constants');
const winston = require('winston');

/* eslint-disable max-len */
const myFormat = winston.format.printf(({ level, message, label }) => {
    return `'Time' : ${new Date().toISOString()} | 'Label' : [${label}] | 'Lavel' : ${level} | 'Message' : ${message}`;
});


const logger = winston.createLogger({
    handleException: true,
    maxSize: 52428800,
    prettyPrint: true,
    format: winston.format.combine(
        winston.format.label({ label: 'NODE_BACKEND' }),
        winston.format.timestamp(),
        myFormat,
    ),
    transports: [
        // new winston.transports.Console({}),
        new winston.transports.File({
            filename: `${constant.PATH.LOG}${new Date().toLocaleDateString()}.log`,
        }),
    ],
});

/** Return Logger instances */
module.exports = logger;
