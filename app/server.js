// MIDDLEWARE IMPORTS
require('dotenv').load();
const port = process.env.PORT || 3000;
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

// const ethnicity_keywords = ['indigenous', 'white peope', 'African Americans', 'Jewish People', 'Asian people', 'Arabs', 'Native Americans', 'Black people', 'pacific islander', 'Irannian people', 'Native Hawaiians', 'Alaska Natives', 'Latino', 'Multiracial', 'Hispanic and Latino Americans', 'Mexicans', 'Pacific Islands Americans', 'Irish People']

// SETTING UP MIDDLEWARES
//server.use(checkAuth);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(checkAuth);

// CUSTOM MOUNTING ROUTES
server.use(authRouter);
server.use(userRouter);
server.use(scholarhips);
server.use(dashboardRouter);


// BOOTING UP PORT
server.listen(port);

module.exports = server;
