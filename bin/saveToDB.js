// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

// ROUTE IMPORTS
const saveToDBRouter = require('./routes/db');

// SETTING DB AND MONGOOSE CONNECTION
require('../../bin/data/scholarboard-db');

// INSTANCE OF EXPRESS
const server = express();

//  REQ/RES MIDDLEWARE
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(expressValidator());

// CUSTOM ROUTE MOUNTS
server.use('/', saveToDBRouter);

// PORT
const port = process.env.PORT;
server.listen(port);

module.exports = server;


