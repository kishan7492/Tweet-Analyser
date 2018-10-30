'use strict';
var express = require('express');
var router = express.Router();
var debug = require('debug');
var mysql = require('mysql');
var fs = require('fs');
var config = require('../config');
var natural = require('natural');
var twitter = require('twitter');

var t = new twitter(config);
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.WordTokenizer();
var sys = require('util');



/* GET home page. */
router.get('/', function (req, res) {
    //connectdb();
    console.log("rster");
    res.render('index', { title: 'Express' });
});


connectdb();

function connectdb(){
    var db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'cab432',

        insecureAuth : true,
      });

    // connect to database
    db.connect((err) => {   
        if (!err) {

            console.log("you are good to go bro")
            tweet();

        }else{
            console.log("got an err mf:-" + err)
            throw err;
            
        }
  
    });
    global.db = db;

}

function tweet() {
    var resultarray = [];
    t.stream('statuses/filter', { track: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z', lang:'en'}, function (stream) {
        stream.on('data', function (tweet) {
            //console.log(tweet.text);
            resultarray.push(tweet.text);
            
            var entities = tokenizer.tokenize(tweet.text);
            var sentiment = analyzer.getSentiment(entities);
            //console.log(entities);
            console.log(sentiment);
            //console.log(resultarray.length);
        });
        stream.on('limit', function (limit) {
            console.log(limit);

        });
        stream.on('error', function (err) {
            console.log(err);
        });

    });
}

module.exports = router;
