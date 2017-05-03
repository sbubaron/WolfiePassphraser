var express = require('express');
var router = express.Router();
var config = require('../config.json');
/* GET home page. */
router.get('/', function(req, res, next) {


  var phrase = "";

  while(!isPhraseValid(phrase)) {
    phrase = generatePassphrase();
  }
  

  console.log(phrase);

  res.render('index', { title: phrase });
});


function isPhraseValid(phrase) {
  if(phrase.length < 16) {
    return false;
  }

  return true;
}


function generatePassphrase() {
  let sentence = config.sentences[getRandomArbitrary(0, config.sentences.length)];

  let sentenceArr = sentence.split(" ");

  let phrase = "";

  for(i=0; i<sentenceArr.length; i++) {
    if(sentenceArr[i][0] == "[") {

      var word_key = sentenceArr[i].replace("[", "").replace("]", "").trim().toLowerCase();
      //console.log(word_key);

      if(word_key in config) {
        //console.log(config[word_key]);

        var word = config[word_key][getRandomArbitrary(0, config[word_key].length)].trim();
        if(word_key.indexOf("people_words") >=0) {

        }
        else {
          word = word.toLowerCase();
        }

        phrase +=  word + " ";
      }
    }
  }

  return phrase;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = router;
