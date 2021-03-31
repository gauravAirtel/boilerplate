"use strict";

const Router = require('express').Router({ caseSensitive: true, strict: true });

const controller = require('./chatController');
const validation = require('./chatValidator');

Router.post('/create-group',
    validation.createGroup,
    controller.createGroup,
);

Router.get('/user-conversations',
    controller.getUserConversations,
);

Router.get('/messages',
    validation.getMessages,
    controller.getMessages
);



module.exports = Router;
