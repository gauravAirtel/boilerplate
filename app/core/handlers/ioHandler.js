"use strict";

const commnUtils = require('../../utils/common');
const redis = require('../../services/redisService');
const chatService = require('../../../app/lib/modules/chat/chatService');
const logger = require('../logger');

module.exports = function (io) {
    const addUser = function (socket) {
        try {
            const decodedJwt = socket.decoded;
            const key = commnUtils.getUserRedisKey(decodedJwt.userId);
            redis.set(key, socket.id);
        } catch (error) {
            logger.error(`Error in [socket][ioHandler][addUser] = ${error}`);
        }

    }

    const joinUser = async function (socket) {
        const decodedJwt = socket.decoded;
        const params = { userId: decodedJwt.userId };
        const conversationIds = await chatService.getUserAllConversationIds(params);
        if (!conversationIds.length) return;
        for (let id of conversationIds) {
            socket.join(id)
        }
    }

    const processMessage = async function (data) {
        try {
            if (!data.conversationsId) {
                data.conversationsId = await chatService.getConversationsId(data);
            }
            var messageData = await chatService.saveMessage(data);

            chatService.updateConversation(data);
            return messageData;
        } catch (error) {
            messageData.error = true;
            return messageData
        }
    }

    return {
        addUser,
        joinUser,
        processMessage
    }
}