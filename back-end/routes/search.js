var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// multi search
router.get('/:query', function(req, res){
    var api_key = config.API_KEY;
    var query = req.params.query;    
    let url = "https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&language=enUS&query="+query;
    axios.get(url).then(data => {
        // fetch top 7 matching media
        var result = '{"resultList":['
        for(var i = 0; i < 7; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"media_type":"' + data.data.results[i].media_type + '",';
            if(data.data.results[i].name != null){
                result += '"name":"' + data.data.results[i].name + '",';
            }else{
                var name = data.data.results[i].title != null ? data.data.results[i].title : data.data.results[i].original_title;
                result += '"name":"' + name + '",';
            }
            if(data.data.results[i].backdrop_path){
                result += '"backdrop_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].backdrop_path + '"';
            }else{
                result += '"backdrop_path":"https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg"';
            }
            if(i != 6){
                result += '},';
            }else{
                result += '}';
            }
        }        
        result += ']}';
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

module.exports = router;
