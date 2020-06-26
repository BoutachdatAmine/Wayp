var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const database = require('../config.json')
const path = require('path');

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database
});
router.get('/singleProduct', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/single-product.html'));
});
router.get('/singleProductData', (req, res) => {
    connection.query(
        `SELECT * FROM PRODUCT where product_id=${req.query.id}`,
        (err, results, fields) => {
            res.send(results);
        }
    )
});

module.exports = router;
