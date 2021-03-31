'use strict';

const constants = require('../../../core/constants');
const msqlDb = require('../../../core/dbs/mysql');

class ChatDao {
    constructor() {
        this.msqlObj = msqlDb.getInstance();
    }

    getUserConversation(params) {
        let query = `SELECT C.title,C.creatorId,C.id as conversationsId
        FROM ${constants.TABLES.CONVERSATIONS} C
        INNER JOIN ${constants.TABLES.PARTICIPANTS} P ON C.id = P.conversationsId 
        WHERE (
            (C.creatorId = ? AND P.userId = ? AND P.userId  <> ?) OR
            (C.creatorId = ? AND P.userId = ? AND P.userId  <> ?)
        ) AND P.type = ? AND C.isDeleted = 0`;


        const values = [
            params.senderId,
            params.receiverId,
            params.senderId,
            params.receiverId,
            params.senderId,
            params.receiverId,
            params.type
        ];
        return this.msqlObj.query('SLAVE', query, values);
    }

    getUserAllConversations(params) {
        let query = `SELECT DISTINCT C.id as conversationsId,C.title,C.creatorId
        FROM ${constants.TABLES.CONVERSATIONS} C
        INNER JOIN ${constants.TABLES.PARTICIPANTS} P ON C.id = P.conversationsId 
        WHERE P.userId = ? AND C.isDeleted = 0`;
        const values = [
            params.userId
        ];
        return this.msqlObj.query('SLAVE', query, values);
    }

    addConversation(params, transaction = null) {
        let query = `INSERT INTO  ${constants.TABLES.CONVERSATIONS} SET ?`;
        if (transaction) return this.msqlObj.transactionQuery(transaction, query, params);
        else return this.msqlObj.query('MASTER', query, params);
    }

    addParticipants(params, transaction = null) {
        let query = `INSERT INTO  ${constants.TABLES.PARTICIPANTS} 
        (conversationsId,userId,type) values ?`;
        const values = [params];
        if (transaction) return this.msqlObj.transactionQuery(transaction, query, values);
        else return this.msqlObj.query('MASTER', query, values);
    }

    addMessage(params, transaction = null) {
        let query = `INSERT INTO  ${constants.TABLES.MESSAGES} SET ?`;
        if (transaction) return this.msqlObj.transactionQuery(transaction, query, params);
        else return this.msqlObj.query('MASTER', query, params);
    }

    getConversation(params, transaction = null) {
        let values = [];
        let query = `SELECT id, title, creatorId, imageUrl, lastMessage, lastMessageType 
        FROM ${constants.TABLES.CONVERSATIONS} WHERE isDeleted = 0`;

        if (params.id) {
            query += ` AND id = ?`;
            values.push(params.id)
        }

        if (params.creatorId) {
            query += ` AND creatorId = ?`;
            values.push(params.creatorId)
        }

        if (transaction) return this.msqlObj.transactionQuery(transaction, query, values);
        else return this.msqlObj.query('SLAVE', query, values);

    }

    getUserConversations(userId) {
        const query = `SELECT  
            C.id AS 'conversationsId',
            P.type AS 'participantsType',
            C.title AS 'conversationsTitle',
            C.creatorId,
            C.memberId,
            C.imageurl AS 'conversationsImageUrl',
            C.lastMessage,
            C.lastMessageType,
            MU.firstName AS 'memberFirstname',
            MU.lastName AS 'memberLastname',
            MU.imageurl AS 'memberImageurl',
            CU.firstName AS 'creatorFirstname',
            CU.lastName AS 'creatorLastname',
            CU.imageurl AS 'creatorImageurl'
        FROM ${constants.TABLES.PARTICIPANTS} P
        LEFT JOIN ${constants.TABLES.CONVERSATIONS} C ON P.conversationsid = C.id
        LEFT JOIN ${constants.TABLES.USERS} MU ON MU.id = C.memberId
        LEFT JOIN ${constants.TABLES.USERS} CU ON CU.id = C.creatorId
        WHERE  isdeleted = 0 AND P.userid = ?`;

        return this.msqlObj.query('MASTER', query, [userId]);
    }

    updateConversation(params, conversationsId) {
        let query = `UPDATE ${constants.TABLES.CONVERSATIONS} SET ? 
        WHERE id = ?`;
        const values = [params, conversationsId];
        return this.msqlObj.query('MASTER', query, values);
    }

    getMessages(data) {
        const conversationsId = data.conversationsId;
        const limit = data.limit || constants.DEFAULT.GET_QUERY_LIMIT;
        const offset = data.offset || constants.DEFAULT.GET_QUERY_OFFSET;

        let query = `SELECT    
            M.id AS messageId,
            M.conversationsId,
            M.senderId,
            M.messageType,
            M.message,
            M.isRead,
            M.createdAt,
            U.firstName,
            U.lastName,
            U.imageUrl
        FROM ${constants.TABLES.MESSAGES} M 
        LEFT JOIN ${constants.TABLES.USERS} U ON M.senderId = U.id
        WHERE M.conversationsId = ? ORDER BY createdAt ASC limit ? offset ?`

        const values = [conversationsId, limit, offset];
        return this.msqlObj.query('MASTER', query, values);

    }
}


module.exports = ChatDao;
