var express = require('express');
var axios = require('axios');
var config = require('./config.json');


// multi search
router.get('/multi', function(req, res){
    var api_key = config.API_KEY;
    let url = "https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&language=enUS&query="
})