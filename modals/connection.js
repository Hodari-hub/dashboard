const mysql = require('mysql');
var connection = mysql.createConnection({host:'localhost',user:'root',password:'',database:'hodari'});
connection.connect();
//host:'localhost',user:'root',password:'rootpa',database:'hodari'
module.exports=connection;