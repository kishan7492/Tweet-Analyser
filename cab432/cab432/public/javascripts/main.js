//var mysql = require("mysql");

function x(resultarray){
            resultarray.forEach(element => {
                $('#text').append("<p id='tweets'>"+element.tweets+"</p>");
            });
    
}