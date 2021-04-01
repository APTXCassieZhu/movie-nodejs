var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// youtube video
router.get('/video/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/tv/"+id+"/videos?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{'
        var len = data.data.results.length;
        if(len == 0){
            result += '"site": "Youtube",'
                + '"type": "fake",'
                + '"name": ' + data.data.results[i].name + ','
                + '"key": "https://www.youtube.com/watch?v=' + data.data.results[i].key + '"}';
        }
        var findTrailer = 0;
        for(var i = 0; i < len; i++){
            if(data.data.results[i].type == 'Trailer'){
                findTrailer = 1;
                result += '"site": ' + data.data.results[i].site + ','
                    + '"type": ' + data.data.results[i].type + ','
                    + '"name": ' + data.data.results[i].name + ','
                    + '"key": "https://www.youtube.com/watch?v=' + data.data.results[i].key + '"}';
                break;
            }
        }  
        if(findTrailer == 0){

        }
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

// tv details
router.get('/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;        
    let url = "https://api.themoviedb.org/3/tv/"+id+"?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{'  
        result += '"title":"' + data.data.name + '",'
            + '"release_date": "' + data.data.first_air_date + '",'
            + '"overview": "' + data.data.overview + '",'
            + '"vote_average": "' + data.data.vote_average + '",'
            + '"tagline": "' + data.data.tagline + '",'
            + '"genres": [';
        var len = data.data.genres.length;
        for(var i = 0; i < len; i++){
            if(i == len - 1){
                result += '"' + data.data.genres[i].name + '"';
            }else{
                result += '"' + data.data.genres[i].name + ',",';
            }
        }
        result += '],'
            + '"spoken_languages": [';
        len = data.data.spoken_languages.length;
        for(var i = 0; i < len; i++){
            if(i == len - 1){
                result += '"' + data.data.spoken_languages[i].name + '"';
            }else{
                result += '"' + data.data.spoken_languages[i].name + ',",';
            }
        }
        result += '],'
            + '"runtime": [';
        len = data.data.episode_run_time.length;
        for(var i = 0; i < len; i++){
            if(i == len - 1){
                result += '' + data.data.episode_run_time[i] + '';
            }else{
                result += '' + data.data.episode_run_time[i] + ',';
            }
        }
        result += '],';
        if(data.data.poster_path){
            result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.poster_path + '"}';
        }else{
            result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"}';
        }
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

module.exports = router;
