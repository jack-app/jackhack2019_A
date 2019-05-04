var express = require('express');
var router = express.Router();

var dic = require( '../../illdic-sample.json' );
const URL = "https://mecab-web-api.herokuapp.com/v1/parse";
const request = require('sync-request');

// illchange("メイのバカ");




/* GET処理 入力フォームの表示 */
router.get('/', function(req, res, next) {
  delete req.session.wordcleaning
  req.session.wordcleaning = req.body['word.value'];
  console.log(req.session.wordcleaning);

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
  console.log(req.session.wordcleaning);
  var aaaa = req.body['word.value'];
  console.log(aaaa);
  var wordcleaned = illchange(req.session.wordcleaning);
  console.log(wordcleaned);
  
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

  // req.body['word.value'] = wordcleaned;
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
