// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
require('./database/scholarboard-db');
const mongoose = require('mongoose');

const app = require('./config/express');

mongoose.Promise = Promise;

//  eslint-disable-next-line
app.listen(3000, () => console.log('server up and running on port 3000'))

module.export = app;
