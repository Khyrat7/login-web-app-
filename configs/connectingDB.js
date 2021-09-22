const mysql = require("mysql");



let db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(function(err){
    if (err) throw err;
    console.log("MySQL database is connected");
})


module.exports= db;