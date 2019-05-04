var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('wordlog.sqlite3');

var dic = require( '../../illdic-sample.json' );
const URL = "https://mecab-web-api.herokuapp.com/v1/parse";
const request = require('sync-request');


/* GET処理 入力フォームの表示 */
router.get('/', function(req, res, next) {
  var data = {
    pagetitle: '本音を教えて！',
    comments: '',
    classname: 'clean',
    url: '/input/post',
    msg: 'キレイにする！',
    test: ''
  }
  res.render('input', data);
});

/* POST処理 結果ページの表示 */
router.post('/post', function(req, res, next) {
  var word1 = req.body['word'];
  console.log(word1);
  if (word1 != "") {
    var rslt = illchange(word1);

    //WATOSON FUNCTION
    function illchange(str) {
      var text = '';
      var response = request('GET', URL,
        {
          qs: {
            'sentence': str,
          },
        }
      );
      var json = JSON.parse(response.getBody('utf8')).items[0];
    
      for (var i = 0; i < json.words.length; i++) {
        var matchData = dic.filter(function (item) {
            if (item.yomi == json.words[i].reading) {
              return item.another;
            }
          }
        );
        if (matchData[0] !== undefined) {
          var rnd = Math.floor(Math.random() * matchData.length);
          text += matchData[rnd].another;
        }else {
          text += json.words[i].surface;
        }
      }
    
    
      console.log(text);
      return text;
    }
    // END WATOSON FUNC

    db.run('insert into wordlog (cleaned, room) values (?, ?)', rslt, 1);

    var data = {
      pagetitle: 'キレイになったよ！',
      comments: rslt,
      classname: 'submit',
      url: '/show',
      msg: '本音を言う',
      test: 'test'
    }
    res.render('input', data);
  } else {
    res.redirect(302, './');
  }
  
});

module.exports = router;
