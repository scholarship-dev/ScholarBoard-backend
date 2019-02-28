// MIDDLEWARE IMPORTS
require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// CUSTOME MIDDLEWARE
const checkAuth = require('./middleware/checkAuth');
const checkUser = require('./middleware/checkUser');

// IMPORTING ROUTES
const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/users');
const scholarhips = require('./routes/api/scholarships');
const dashboardRouter = require('./routes/api/dashboard');

// SETTING DB AND MONGOOSE CONNECTION
require('./database/scholarboard-db');

// INSTANCE OF EXPRESS
const server = express();

// SETTING UP MIDDLEWARES
//server.use(checkAuth);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(checkAuth);

// CUSTOM MOUNTING ROUTES
server.use('/api', authRouter);
server.use('/api', userRouter);
server.use('/api', scholarhips);
server.use('/api', dashboardRouter);


// BOOTING UP PORT
const port = process.env.PORT || 3000;
server.listen(port);

module.exports = server;
