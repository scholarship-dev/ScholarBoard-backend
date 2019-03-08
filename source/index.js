// require and configure dotenv, will load vars in .env in PROCESS.ENV
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env'),
});
require('./database/scholarboard-db');
const mongoose = require('mongoose');

const app = require('./config/express');

mongoose.Promise = Promise;

//  eslint-disable-next-line
app.listen(process.env.PORT || 3000, () => console.log(`server up and running on port ${process.env.PORT}`))

module.export = app;
