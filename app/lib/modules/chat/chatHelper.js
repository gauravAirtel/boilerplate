'use strict';

const constants = require('../../../core/constants');
const commonUtils = require('../../../utils/common');

/**
 * @description Returns payload to create conversation
 * @param {object} data 
 */
function getConversationPayload(data) {
    const payload = {};
    payload["id"] = commonUtils.getUUID();
    payload["title"] = data.title || null;
    payload["creatorId"] = data.senderId || data.userId;
    payload["memberId"] = data.receiverId || null; // Group don't have receiverId
    return payload;
}


function getParticipantsPayload(data, conversionData) {
    // serial [conversationsId,userId,type]
    const payload = [
        [conversionData.id, data.senderId, data.type],
        [conversionData.id, data.receiverId, data.type],
    ];
    return payload;
}

/**
 * @description Returns payload for message
 * @param {object} data 
 */
function getMessagePayload(data) {
    const payload = {};
    payload["id"] = commonUtils.getUUID();
    payload["conversationsId"] = data.conversationsId;
    payload["senderId"] = data.senderId;
    payload["messageType"] = data.messageType;
    payload["message"] = data.message;
    return payload;
}

/**
 * @description Create payload for adding group participants
 * @param {array} userIds 
 * @param {json} conversionData 
 */
function getGroupParticipantsPayload(userIds, conversionData) {
    let payload = [];
    for (let userId of userIds) {
        let arr = [];
        arr.push(conversionData.id, userId, constants.PARTICIPANTS_TYPE.GROUP);
        payload.push(arr);
    }
    return payload;
}

/**
 * @description Create conversation response
 * @param {*} data 
 */
function conversationResponse(userData, data) {
    const response = [];

    for (let value of data) {
        const jsonData = {};
        let conversationsTitle, conversationsImageUrl;

        if (value.participantsType === constants.PARTICIPANTS_TYPE.GROUP) {
            conversationsTitle = value.conversationsTitle
            conversationsImageUrl = value.conversationsImageUrl
        }

        if (value.participantsType === constants.PARTICIPANTS_TYPE.SINGLE) {
            if (userData.userId === value.memberId) {
                conversationsTitle = `${value.creatorFirstname} ${value.creatorLastname}`;
                conversationsImageUrl = value.creatorImageurl;
            }
            if (userData.userId === value.creatorId) {
                conversationsTitle = `${value.memberFirstname} ${value.memberLastname}`;
                conversationsImageUrl = value.memberImageurl;
            }
        }

        jsonData["conversationsId"] = value.conversationsId;
        jsonData["conversationsTitle"] = conversationsTitle;
        jsonData["conversationsImageUrl"] = conversationsImageUrl;
        jsonData["participantsType"] = value.participantsType;
        jsonData["creatorId"] = value.creatorId;
        jsonData["memberId"] = value.memberId;
        jsonData["lastMessage"] = value.lastMessage;
        jsonData["lastMessageType"] = value.lastMessageType;

        response.push(jsonData);
    }
    return response;
}

/**
 * @description Create data to display message on frontend
 */
function getFrontendMsgPayload(createdData, receivedData) {

    const date = new Date();

    const payload = {};
    payload["messageId"] = createdData.id;
    payload["conversationsId"] = createdData.conversationsId;
    payload["senderId"] = createdData.senderId;
    payload["messageType"] = createdData.messageType;
    payload["message"] = createdData.message;
    payload["isRead"] = 0;
    payload["createdAt"] = `${date.getHours()}:${date.getMinutes()}`;
    payload["firstName"] = receivedData.firstName;
    payload["lastName"] = receivedData.lastName;
    payload["imageUrl"] = receivedData.imageUrl;

    return payload;
}

module.exports = {
    getConversationPayload,
    getParticipantsPayload,
    getMessagePayload,
    getGroupParticipantsPayload,
    conversationResponse,
    getFrontendMsgPayload
}