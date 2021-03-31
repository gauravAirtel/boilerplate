"use strict";

const constants = require('../../../core/constants');
const chatService = require('./chatService');
const responseHandler = require('../../../core/handlers/responseHandler');


/**
 * @description Creates a new Group
 */
async function createGroup(req, res, next) {
    try {
        Object.assign(req.body, req.decoded); // added decoded jwt in body
        await chatService.createGroup(req.body);
        res.json(responseHandler.createRes({
            statusMessage: constants.RESPONSE_MESSAGES.GROUP_CREATED,
            response: {}
        }));
    } catch (error) {
        throw error;
    }
}

/**
 * @description Returnes all conversations of the user
 */
async function getUserConversations(req, res, next) {
    try {
        const conversations = await chatService.getUserConversations(req.decoded);
        res.json(responseHandler.createRes({
            statusMessage: constants.RESPONSE_MESSAGES.CONVERSATIONS_FETCED,
            response: conversations
        }));
    } catch (error) {
        throw error;
    }
}

/**
 * @description Get messages from provided conversationsId
 */
async function getMessages(req, res, next) {
    try {
        const messages = await chatService.getMessages(req.query);
        res.json(responseHandler.createRes({
            statusMessage: constants.RESPONSE_MESSAGES.MESSAGES_FETCED,
            response: messages
        }));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createGroup,
    getUserConversations,
    getMessages
}