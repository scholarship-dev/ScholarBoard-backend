// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ROUTE IMPORTS
const routes = require('../routes/api');

// SETTING DB AND MONGOOSE CONNECTION
require('../../bin/data/scholarboard-db');

// INSTANCE OF EXPRESS
const server = express();

// REQ/RES MIDDLEWARE (CORS - CROSS ORIGIN RESOURCE SHARING)
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

// MOUNTING ROUTES TO API PATH
server.use('/api', routes);

// PORT
const port = process.env.PORT;
server.listen(port);

module.exports = server;

