"use strict";

/* ---- Node Modules -----*/
const fs = require('fs');
// const util = require('util');

/* ---- Local Modules -----*/
const constants = require('../../../core/constants');
const exceptions = require('../../../core/exceptions');
const commonUtils = require('../../../utils/common');
const logger = require('../../../core/logger');


async function multerUpload(file) {
    try {
        if (!file) throw exceptions("FILE_NOT_FOUND");

        const url = moveToDestination(file.path);
        return url;

    } catch (error) {
        logger.error(`Error in [commonService][multerUpload] = ${commonUtils.logMsg(error)}`);
        throw error;
    }

}

async function moveToDestination(path) {
    try {

        const url = `${constants.FILE_UPLOAD.DEFAULT_DESTINATION_PATH}/${commonUtils.getUUID()}`;

        /**
         * IN this function we can send file to s3 and then delete the local file
         */
        var readStream = fs.createReadStream(path);
        var writeStream = fs.
            createWriteStream(url);

        readStream.on('error', (err, data) => { });
        writeStream.on('error', (err, data) => { });

        readStream.on('close', function () {
            fs.unlink(path, (err, data) => { });
        });
        readStream.pipe(writeStream);

        return { url: url };

    } catch (error) {
        throw error;
    }
}


async function removeLocalFile(file) {
    try {

    } catch (error) {
        throw error;
    }
}

module.exports = {
    multerUpload,
    moveToDestination,
    removeLocalFile
}