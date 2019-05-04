var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('wordlog.sqlite3');

/* GET処理 */
router.get('/', function(req, res, next) {
  db.serialize(() => {
    db.all('select * from wordlog', (err, rows)=>{
      if (!err) {
        var data = {
          content: rows
        };
        res.render('show', data);
      }
    });
  });
});

/* POST処理 */
router.post('/', function(req, res, next) {
  db.serialize(() => {
    db.all('select * from wordlog', (err, rows)=>{
      if (!err) {
        var data = {
          content: rows
        };
        res.render('show', data);
      }
    });
  });
});

module.exports = router;
