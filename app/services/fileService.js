"use strict";

const multer = require('multer');
const path = require('path');
const logger = require('../core/logger');
const constants = require('../core/constants');
const exceptions = require('../core/exceptions');


/**
 * @description file upload using multer
 */
const multerUpload = multer({
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        ext = ext ? ext.toLowerCase() : ext;
        if (!constants.FILE_UPLOAD.ALLOWED_DOCUMENT_TYPES.includes(ext)) {
            logger.error(`[FILE_UPLOAD][FILE_TYPE_NOT_ALLOWED] File = ${JSON.stringify(file)}`);
            return cb(exceptions("FILE_TYPE_NOT_ALLOWED"));
        }
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, constants.FILE_UPLOAD.DEFAULT_STORAGE_PATH)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    limits: {
        //We Have to add extra middleware to log this error
        fileSize: constants.FILE_UPLOAD.ALLOWED_DOCUMENT_SIZE
    }
});


module.exports = {
    multerUpload
};