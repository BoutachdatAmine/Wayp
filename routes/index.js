var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/terms.html'));
});
router.get('/refund', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/refund.html'));
});
router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/profile.html'));
});

module.exports = router;
