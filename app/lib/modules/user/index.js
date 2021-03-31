/* ---- Node Modules -----*/
const Router = require('express').Router({caseSensitive: true, strict: true});

/* ---- Local Modules -----*/
const controller = require('./userController');
const validation = require('./userValidater');


/**
 *@description User signup
 */
Router.post('/signup',
    validation.signup, /* User signup validator */
    controller.signup, /* User signup controller */
);


/**
 *@description User signin
 */
Router.post('/signin',
    validation.signin, /* User signin validator */
    controller.signin, /* User signin controller */
);

/**
 *@description get All users
 */
Router.get('/',
    controller.getUsers, /* getUsers controller */
);

module.exports = Router;
