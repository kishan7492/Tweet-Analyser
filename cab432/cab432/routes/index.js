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
    //console.log("rster");
    res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/result', function (req, res) {
    console.log(req.query.search_query);
    getresults(req.query.search_query, res);
    //res.render('index', { title: 'Express' });
});




var db = mysql.createConnection({
    host     : 'cab432database.cgkf18rr0vyj.ap-southeast-1.rds.amazonaws.com',
    user     : 'root',
    password : 'password',
    database : 'twitter',
    charset  : 'utf8mb4'
    //insecureAuth : 'true'
  });

// connect to database
db.connect((err) => {   
    if (!err) {

        console.log("you are good to go bro")
        //tweet();

    }else{
        console.log("got an err mf:-" + err)
        throw err;

    }

});
global.db = db;
//{ track: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z', language:'en'}
function tweet() {
    var resultarray = [];
    t.stream('statuses/filter', { track: 'a', language:'en'}, function (stream) {
        stream.on('data', function (tweet) {
            //console.log(tweet.text);
            resultarray.push(tweet.text);
            
            db.query("INSERT INTO twitter.tweets (tweets) VALUES (?)",[String(tweet.text)], function(err,res){
                
                if(err) throw err;
                
                //console.log("successfully inserted");
                
            });
            
            //var entities = tokenizer.tokenize(tweet.text);
            //var sentiment = analyzer.getSentiment(entities);
            //console.log(entities);
            //console.log(sentiment);
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


function getresults(query,response){

    var q = "%"+query+"%";
    db.query("SELECT tweets FROM twitter.tweets WHERE tweets LIKE ?", [q],function(err,res,fields){
        if(err) throw err;
        // res.forEach(element => {
        //     console.log("kisbdjshv "+element.tweets);
        // });
        var sentiment=0;
        res.forEach(element => {
            var entities = tokenizer.tokenize(element.tweets);
            sentiment = sentiment + analyzer.getSentiment(entities);
        });
        console.log((sentiment)/res.length);
        response.render('index', { resultarray:JSON.stringify(res),sentiment:sentiment});
        console.log("got it bro");
        
    });

}

module.exports = router;
