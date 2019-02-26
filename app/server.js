// IMPORT NEEDED MODULES AND CONTROLLERS
require('dotenv').config();
const port = process.env.PORT || 3000
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const authRouter = require('./routes/api/auth');
const requirementRouter = require('./routes/api/requirement');
const userRouter = require("./routes/api/users")
const scholarhips = require("./routes/api/scholarships")
const checkAuth = require("./routes/api/checkAuth")
require('./database/scholarboard-db');
const ethnicity_keywords = ["indigenous", "white peope", "African Americans", "Jewish People", "Asian people", "Arabs", "Native Americans", "Black people", "pacific islander", "Irannian people", "Native Hawaiians", "Alaska Natives", "Latino", "Multiracial", "Hispanic and Latino Americans", "Mexicans", "Pacific Islands Americans", "Irish People"]


// SETTING UP MIDDLEWARES
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
app.use(checkAuth)
server.use(userRouter)
server.use(requirementRouter);
server.use(scholarhips);

// PORT
server.listen(port);

module.exports = server;
