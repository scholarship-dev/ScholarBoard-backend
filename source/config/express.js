const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('../index.routes');
const checkAuth = require('../middleware/checkAuth');

const server = express();

// INITIALISE MIDDLEWARE:
server.use(cookieParser());
server.use(checkAuth);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// MOUNTING ALL ROUTES
server.use('/api', routes);

module.exports = server;