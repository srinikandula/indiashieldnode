var express = require('express');
const { sendOTP } = require('../controllers/controller');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.route('/').post(sendOTP);

module.exports = router;
