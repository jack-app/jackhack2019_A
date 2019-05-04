var express = require('express');
var router = express.Router();

/* GET処理 */
router.get('/', function(req, res, next) {
  res.render('show');
});

/* POST処理 */
router.post('/', function(req, res, next) {
  res.render('show');
});

module.exports = router;
