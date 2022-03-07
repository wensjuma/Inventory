const mySql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

var connection = mySql.createConnection({
    host     : process.env.HOST,
    user     : process.env.DBUSER,
    password :  process.env.DBKEY,
    database :    process.env.DATABASE
});

connection.connect(function(err) {
    if (err)
    { 
        throw err;
    }else{
        console.log('MYSQL CONNECTION ESTABLISHED!!')
    }
});

module.exports = connection;