var dic = require( './illdic-sample.json' );
const URL = "https://mecab-web-api.herokuapp.com/v1/parse";
const request = require('sync-request');

//illchange("メイのバカ");



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
