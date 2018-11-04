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
var keyword_extractor = require("keyword-extractor");

// // // // //make connections to AWS RDS database
var db = mysql.createConnection({
    host: 'cab432.cevhpb2zx7bd.ap-southeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'twitter',
    charset: 'utf8mb4'

});


////////////////////////////////////////////////////////////////////////////////
//   to run the program on local computer make database of twitter and uncomment below function  
//    and commentout above function
////////////////////////////////////////////////////////////////////////////


// //make connection to the local database
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'twitter',
//     charset: 'utf8mb4'
//     //insecureAuth : 'true'
// });

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Kowalski Analysis', resultarray: '0', sentiment: 0, impwords: 0 });
});
/* GET home page. */
router.get('/result', function (req, res) {

    getresults(req.query.search_query, res);

});

// connect to database
db.connect((err) => {
    if (!err) {
        console.log("Database connected Successfully.")
        tweet();

    } else {
        console.log("Database connection error:- " + err)
        throw err;
    }
});
global.db = db;


//gets tweet from api and pushes to the database
function tweet() {
    var resultarray = [];
    t.stream('statuses/filter', { track: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z', language: 'en' }, function (stream) {
        stream.on('data', function (tweet) {
            resultarray.push(tweet.text);
            db.query("INSERT INTO twitter.tweets (tweets) VALUES (?)", [String(tweet.text)], function (err, res) {
                if (err) throw err;
            });
        });

        stream.on('limit', function (limit) {
            console.log(limit);
        });

        stream.on('error', function (err) {
            console.log(err);
        });
    });
}


//functtion get the tweets results from databse based on user's keywords
function getresults(query, response) {

    //generating query 
    var q = "'%" + query.split(" ").join("%' OR tweets LIKE '%") + "%'";
    var sqlquery = "SELECT tweets FROM twitter.tweets WHERE tweets LIKE  " + q;

    //query execution
    db.query(sqlquery, function (err, res, fields) {
        if (err) throw err;


        //sentiment analysis 
        var sentiment = 0;
        res.forEach(element => {
            var entities = tokenizer.tokenize(element.tweets);
            sentiment = sentiment + analyzer.getSentiment(entities);
        });

        //extrecting important words from tweets 
        var impwords = [];
        res.forEach(element => {
            impwords.push(keyword_extractor.extract(element.tweets, { language: "english", remove_digits: true, return_changed_case: true }));
        });


        //preparing variables for binding.
        var averagesentiment = (sentiment) / res.length;


        response.render('index', { title: 'Kowalski Analysis', resultarray: JSON.stringify(res), sentiment: averagesentiment, impwords: JSON.stringify(impwords) });
        console.log("Page rendered successfully.");
    });
}

module.exports = router;