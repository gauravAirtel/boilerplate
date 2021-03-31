'use strict';

const msqlChatDao = new (require('../../dao/mysql/chatDao'));
const msqlDb = require('../../../core/dbs/mysql');
const msqlObj = msqlDb.getInstance();
const commonUtils = require('../../../utils/common');
const logger = require('../../../core/logger');

// const constants = require('../../../core/constants');
const chatHelper = require('./chatHelper');

/**
 * @description
 * @param {object} data 
 */
async function getConversationsId(data) {
    try {
        //[TODO] : check for type('single','group') 
        let conversationData = await msqlChatDao.getUserConversation(data);
        if (conversationData.length) {
            conversationData = conversationData[0];
            return conversationData.conversationsId;
        }

        var transaction = await msqlObj.beginTransactionPromise();
        const conversationPayload = chatHelper.getConversationPayload(data);
        await msqlChatDao.addConversation(conversationPayload, transaction);
        const participantsPayload = chatHelper.getParticipantsPayload(data, conversationPayload);
        await msqlChatDao.addParticipants(participantsPayload, transaction);
        await msqlObj.commitTransactionPromise(transaction);
        return conversationPayload.id;

    } catch (error) {
        logger.error(`Error in [chat][service][getConversationsId] = ${commonUtils.logMsg(error)}`);
        msqlObj.rollbackTransactionPromise(transaction);
        throw error;
    }
}

/**
 * @description save message in DB
 * @param {object} data 
 */
async function saveMessage(data) {
    try {
        const messagePayload = chatHelper.getMessagePayload(data);
        await msqlChatDao.addMessage(messagePayload);
        const frontendPayload = chatHelper.getFrontendMsgPayload(messagePayload, data);
        return frontendPayload;
    } catch (error) {
        logger.error(`Error in [chat][service][saveMessage] = ${commonUtils.logMsg(error)}`);
        throw error;
    }
}

/**
 * @description Get users all existing conversations
 * @param {object} data 
 */
async function getUserAllConversationIds(data) {
    const conversationData = await msqlChatDao.getUserAllConversations(data);
    if (!conversationData.length) {
        return conversationData;
    }
    const ids = conversationData.map(elem => elem.conversationsId);
    return ids;
}

/**
 * @description Create a new group and add participants if given in data
 * @param {object} data 
 */
async function createGroup(data) {
    try {
        var transaction = await msqlObj.beginTransactionPromise();

        const convertationPayload = chatHelper.getConversationPayload(data);
        await msqlChatDao.addConversation(convertationPayload, transaction);

        if (data.participants) {
            //[TODO] validate participants userIds
            data.participants.push(data.userId) // added creatorId
            const participantsPayload = chatHelper.getGroupParticipantsPayload(
                data.participants,
                convertationPayload
            );
            await msqlChatDao.addParticipants(participantsPayload, transaction);
        }
        await msqlObj.commitTransactionPromise(transaction);
    } catch (error) {
        logger.error(`Error in [chat][service][createGroup] = ${commonUtils.logMsg(error)}`);
        msqlObj.rollbackTransactionPromise(transaction);
        throw error;
    }
}

/**
 * Update conversation (add last message and it type)
 * @param {object} data 
 */
async function updateConversation(data) {
    try {
        const params = {
            lastMessage: data.message,
            lastMessageType: data.messageType
        }
        await msqlChatDao.updateConversation(params, data.conversationsId);

    } catch (error) {
        logger.error(`Error in [chat][service][updateConversation] = ${commonUtils.logMsg(error)}`);
    }
}

/**
 * Returns users all conversation.
 * @param {object} data 
 */
async function getUserConversations(data) {
    try {
        const dbData = await msqlChatDao.getUserConversations(data.userId);
        return chatHelper.conversationResponse(data, dbData)
    } catch (error) {
        logger.error(`Error in [chat][service][getUserConversations] = 
        ${commonUtils.logMsg(error)}`);
        throw error;
    }
}

/**
 * @description Get Messages.
 * @param {object} data 
 */
async function getMessages(data) {
    try {
        const response = await msqlChatDao.getMessages(data);
        return { count: 10, data: response } // [TODO] add count logic
    } catch (error) {
        logger.error(`Error in [chat][service][getMessages] = 
        ${commonUtils.logMsg(error)}`);
        throw error;
    }
}

module.exports = {
    getConversationsId,
    saveMessage,
    getUserAllConversationIds,
    createGroup,
    updateConversation,
    getUserConversations,
    getMessages
}