const { json } = require('express');
var mysql = require('mysql');
// import { dbConfig } from './config';
var dbConfig = require('./config');
var con = mysql.createConnection(dbConfig);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



module.exports = con;