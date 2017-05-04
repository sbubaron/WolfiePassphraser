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

  res.render('index', { phraseSentenceForm: phrase, phraseNoSpacesForm: removeSpaces(phrase),phraseLeetForm: leetUp(phrase) });
});


function isPhraseValid(phrase) {
  if(phrase.length < 16) {
    return false;
  }

  return true;
}


function removeSpaces(phrase) {
  var noSpaces = phrase.replace(/ /g, "");

  return noSpaces;
}


function generatePassphrase() {
  let sentence = config.sentences[getRandomArbitrary(0, config.sentences.length)];

  let sentenceArr = sentence.split("[");

  let phrase = "";

  for(i=0; i<sentenceArr.length; i++) {
    

      var word_key = sentenceArr[i].replace("[", "").replace("]", "").trim().toLowerCase();
      //console.log(word_key);

      if(word_key in config) {
        //console.log(config[word_key]);

        var word = config[word_key][getRandomArbitrary(0, config[word_key].length)];
        if(word_key.indexOf("people_words") >=0) {

        }
        else {
          word = word.toLowerCase();
        }

        if(sentenceArr[i].endsWith(' '))
          phrase +=  word + " ";
        else
          phrase += word;
      }
    
  }

  return phrase;
}

function leetUp(phrase) {
  
  leetPhrase = phrase;

  if((phrase.match(/o/g) || []).length > 2) {
    leetPhrase = leetPhrase.replace(/o/g, "<span style='font-weight: bold'>0</span>");
  }

  else if((phrase.match(/o/g) || []).length > 2) {
    leetPhrase = leetPhrase.replace(/a/g, "<span style='font-weight: bold'>4</span>");
  }

  else if((phrase.match(/e/g) || []).length > 2) {
    leetPhrase = leetPhrase.replace(/e/g, "<span style='font-weight: bold'>3</span>");
  }


  return leetPhrase;

}


function getImage(word) {
  
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = router;
