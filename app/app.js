"use strict";

const express = require('express');
const app = express();
const exceptions = require('./core/handlers/exceptionHandler');
const routes = require('./lib/routes');
const cors= require('cors');
const compression = require('compression');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors())

/**
 * @description Injecting all Routes
 */
routes(app);


/**
 * @description This middleware will handle all the unexpected errors and custom errors
 */
app.use(exceptions.errorHandler);

module.exports = app;
