var express = require('express');
var router = express.Router();

/* GET処理 入力フォームの表示 */
router.get('/', function(req, res, next) {
  var data = {
    pagetitle: '本音を教えて！',
    comments: 'これが私の本心だよ。',
    classname: 'clean',
    url: '/input/post',
    msg: 'キレイにする！'
  }
  res.render('input', data);
});

/* POST処理 結果ページの表示 */
router.post('/post', function(req, res, next) {
  var data = {
    pagetitle: 'キレイになったよ！',
    comments: '結果',
    classname: 'submit',
    url: '/show',
    msg: '本音を言う'
  }
  res.render('input', data);
});

module.exports = router;
