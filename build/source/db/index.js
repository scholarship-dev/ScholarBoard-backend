"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function connectToDB() {
    try {
        mongoose_1.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds233268.mlab.com:33268/scholarboard`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to the DB`);
    }
    catch (e) {
        console.log(e);
    }
}
connectToDB();
