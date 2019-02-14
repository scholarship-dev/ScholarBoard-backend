// MODULES IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());


// MOUNTING ROUTES TO API PATH
// server.use('/api', indexRouter);
// server.use('/api', authRouter);
server.use(requirementRouter);
// server.use('/api', studentRouter);

server.get('/', (req,res) => {
  console.log("medi??")
  res.send("hi")
})
// PORT
const port = 3000;
server.listen(port);

module.exports = server;
