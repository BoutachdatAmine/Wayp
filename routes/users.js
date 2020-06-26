const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();

const mysql = require('mysql');
const database = require('../config.json')

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database
});

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  let name = "";
  connection.query(
    `SELECT first_name, last_name FROM CUSTOMER WHERE email = ?`,
    [req.user.emails[0].value],
    (err, results, fields) =>{
      name = results[0].first_name + "," + results[0].last_name;
      req.user.name = name;
      res.send(req.user);
    }
  )
});

module.exports = router;
