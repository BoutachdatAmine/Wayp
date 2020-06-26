var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const database = require('../config.json')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());

const connection = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database
});
router.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/cart.html'));
});
router.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/checkout.html'));
});

//Post method route
//Get current day 
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;

router.post('/newOrder', (req, res) => {

    res.send(req.body.customerId);
    //Create a new order
    connection.query("INSERT INTO `ORDERS` (customer_id, total_price, order_date) VALUES (?,?,?)",
        //  2020-05-26.13:21:45
        [req.body.custId, req.body.totalPrice, dateTime], //--------------------------------------------------------------------------------> RAYAN. Here you need to fill the customer id and totalprice
        (err, results) => {
            try {
                console.log("FIRST STATEMENT: " + results[0]);
                res.send('ok');
            } catch {
                console.log(err);
            }
        }
    );
});

router.post('/newOrderProduct', (req, res) => {
    let custId = req.body.custId;
    let productId = req.body.id;
    let productPrice = req.body.price;
    let productQty = req.body.quantity;
    let orderId;

    //Select the order id, using the customer id from the user that is actually logged in.
    connection.query("SELECT order_id FROM `ORDERS` WHERE customer_id = ? ",
        [custId], //------------------------> RAYAN. Here you need to fill the customer id.
        (err, results, fields) => {
            orderId = results[0];

        });

    //Select the product price with the product id.
    connection.query(
        "SELECT price FROM `PRODUCT` WHERE product_id = ?",
        [productId],
        (err, results, fields) => {
            productPrice = results;
            res.send(results);
        });

    let priceofproduct = productQty * parseFloat(productPrice).toFixed(2);
    
    //Insert the order product in the database
    connection.query(
        "INSERT INTO `ORDER_PRODUCT` (order_id, product_id, quantity, total_price_product) VALUES (?,?,?,?)",
        [20, productId, productQty, priceofproduct],
        (err, results) => {
            /* console.log(req.body.quantity)
            console.log("THIRD STATEMENT ERROR: " + err);
            console.log("THIRD STATEMENT OK:" + results) */
            //res.send(results);
        });
});


module.exports = router;