const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.USER || "Me",
  password: process.env.PASSWORD || "test",
  database: process.env.DATABASE || "Scholarboard",
  port: process.env.PORT || "8080"
});

connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});
