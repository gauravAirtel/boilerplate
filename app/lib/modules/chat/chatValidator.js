const exceptionHandler = require('../../../core/handlers/exceptionHandler');
const FastestValidator = require('fastest-validator');
const validator = new FastestValidator();
// const constants = require('../../../core/constants');


/**
 * @description User createGroup validator.
 */
function createGroup(req, res, next) {
    const schema = {
        title: {
            type: 'string'
        },
        participants: {
            type: 'array',
            empty: false,
            optional: true
        },
        $$strict: true
    };

    const validationResult = validator.validate(req.body, schema);
    if (validationResult === true) return next();
    return res.status(400).json(exceptionHandler.validationErrors(validationResult));
}

/**
 * @description Get messages validator.
 */
function getMessages(req, res, next) {
    const schema = {
        conversationsId: {
            type: 'uuid'
        },
        limit: {
            type: 'string',
            optional: true
        },
        offset: {
            type: 'string',
            optional: true
        }
    };

    const validationResult = validator.validate(req.query, schema);
    if (validationResult === true) return next();
    return res.status(400).json(exceptionHandler.validationErrors(validationResult));
}

module.exports = {
    createGroup,
    getMessages
};
