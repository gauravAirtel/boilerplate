"use strict";

/* ---- Node Modules -----*/

/* ---- Local Modules -----*/
const constants = require('../../../core/constants');
const responseHandler = require('../../../core/handlers/responseHandler');
const commonService = require('./commonService');

async function multerUpload(req, res, next) {
	try {

		const response = await commonService.multerUpload(req.file);

		res.json(responseHandler.createRes({
			statusMessage: constants.FILE_UPLOAD_SUCCESS,
			response: response,
		}));
	} catch (error) {
		next(error);
	}
}


module.exports = {
	multerUpload,
};
