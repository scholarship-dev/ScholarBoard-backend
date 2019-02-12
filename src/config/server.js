// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ROUTE IMPORTS
const indexRouter = require('../routes/api/index');
const authRouter = require('../routes/api/auth');
const requirementRouter = require('../routes/api/requirement');
const studentRouter = require('../routes/api/student');

// SETTING DB AND MONGOOSE CONNECTION
require('../../bin/db/scholarboard-db');

// INSTANCE OF EXPRESS
const server = express();

// REQ/RES MIDDLEWARE (CORS - CROSS ORIGIN RESOURCE SHARING)
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

// MOUNTING ROUTES TO API PATH
server.use('/api', indexRouter);
server.use('/api', authRouter);
server.use('/api', requirementRouter);
server.use('/api', studentRouter);

// PORT
const port = process.env.PORT;
server.listen(port);

module.exports = server;

