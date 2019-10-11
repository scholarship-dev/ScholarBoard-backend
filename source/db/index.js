const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "test",
  port: process.env.PORT || "8080",
  database: process.env.DB || "Scholarboard"
});

function connectToDB() {
  db.connect(err => {
    if (err) {
      console.error(`Error Connection: ${err.message}`);
      return;
    }
    const sql = `CREATE TABLE users (name VARCHAR(255), address VARCHAR(255)`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`Table created`);
    });
    console.log(`Connected to ${db.host}`);
    return;
  });
}

connectToDB();
