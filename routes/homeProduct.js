var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const database = require('../config.json')

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database
});

router.get('/products', (req, res) => {
    connection.query(
        `SELECT * FROM PRODUCT`,
        (err, results, fields) => {
            res.send(results);
        }
    );
});

module.exports = router;
