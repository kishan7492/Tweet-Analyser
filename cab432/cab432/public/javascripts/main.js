//var mysql = require("mysql");

function tweetWriter(resultarray){
    if(resultarray.length=== 0){
        document.getElementById("text").innerHTML = "Sorry no results found matching your Keyword. Search another key word "
    }
            resultarray.forEach(element => {
                $('#text').append("<p id='tweets'>"+element.tweets+"</p>");
            });
    
}

function loadsentiment(sentiment){
    //console.log(sentiment);
    var gauge5 = loadLiquidFillGauge("fillgauge5", sentiment, config4);
}