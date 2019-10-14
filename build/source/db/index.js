"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function connectToDB() {
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds233268.mlab.com:33268/scholarboard`;
    try {
        mongoose_1.connect(uri, {
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
