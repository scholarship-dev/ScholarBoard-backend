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
const app = express();

// REQ/RES MIDDLEWARE (CORS - CROSS ORIGIN RESOURCE SHARING)
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// MOUNTING ROUTES TO API PATH
app.use('/api', indexRouter);
app.use('/api', authRouter);
app.use('/api', requirementRouter);
app.use('/api', studentRouter);

// PORT
const port = process.env.PORT;
app.listen(port);

module.exports = app;

