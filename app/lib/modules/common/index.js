"use strict";

/* ---- Node Modules -----*/
const commonRouter = require('express').Router({ caseSensitive: true, strict: true });

/* ---- Local Modules -----*/
const controller = require('./commonController');
const fileService = require('../../../services/fileService');

/**
 *@description Add multer
 */
commonRouter.post('/multer-upload',
    fileService.multerUpload.single('file'),
    controller.multerUpload
);


module.exports = commonRouter;
