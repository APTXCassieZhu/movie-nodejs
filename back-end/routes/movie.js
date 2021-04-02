var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// youtube video
router.get('/video/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{'
        var len = data.data.results.length;
        if(len == 0){
            result += '"site": "Youtube",'
                + '"type": "fake",'
                + '"name": "undefined",' 
                + '"key": "tzkWB85ULJY"}';
        }
        var findTrailer = 0;
        for(var i = 0; i < len; i++){
            if(data.data.results[i].type == 'Trailer'){
                findTrailer = 1;
                result += '"site": "' + data.data.results[i].site + '",'
                    + '"type": "' + data.data.results[i].type + '",'
                    + '"name": "' + data.data.results[i].name + '",'
                    + '"key": "' + data.data.results[i].key + '"}';
                break;
            }
        }  
        if(findTrailer == 0){
            for(var i = 0; i < len; i++){
                if(data.data.results[i].type == 'Teaser'){
                    result += '"site": "' + data.data.results[i].site + '",'
                        + '"type": "' + data.data.results[i].type + '",'
                        + '"name": "' + data.data.results[i].name + '",'
                        + '"key": "' + data.data.results[i].key + '"}';
                    break;
                }
            }  
        }
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

// movie details
router.get('/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;        
    let url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{'  
        result += '"title":"' + data.data.title + '",'
            + '"release_date": "' + data.data.release_date + '",'
            + '"runtime": [' + data.data.runtime + '],'
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

// movie reviews
router.get('/:id/reviews', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;     
    let url = "https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        // fetch at most 10 reviews
        // var len = Math.min(data.data.results.length, 10);
        // var result = '{"resultList":['
        // for(var i = 0; i < len; i++){
        //     result += '{'
        //         + '"author":' + data.data.results[i].author + ','
        //         + '"content":"' + data.data.results[i].content + '",'
        //         + '"created_at":"' + data.data.results[i].created_at + '",'
        //         + '"url":"' + data.data.results[i].url + '",';
        //     if(data.data.results[i].rating){
        //         result += '"rating":"' + data.data.results[i].rating + '",';
        //     }else{
        //         result += '"rating":"0",';
        //     }
        //     if(data.data.results[i].avatar_path){
        //         result += '"avatar_path":"https://image.tmdb.org/t/p/original' + data.data.results[i].avatar_path + '"';
        //     }else{
        //         result += '"avatar_path":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"';
        //     }
        //     if(i != len-1){
        //         result += '},';
        //     }else{
        //         result += '}';
        //     }
        // }        
        // result += ']}';
        // res.json(JSON.parse(result));
        res.json(data.data.results);
    }).catch(err => {
        res.send(err);
    })
})

// recommend
router.get('/:id/recommend', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;   
    let url = "https://api.themoviedb.org/3/movie/"+id+"/recommendations?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var len = data.data.results.length;
        var result = '{"resultList":['
        for(var i = 0; i < len; i++){
            if(i != 0){
                result += ',';
            }
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"}';
        }        
        result += ']}';
        console.log(result);
        
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

// similar
router.get('/:id/similar', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;   
    let url = "https://api.themoviedb.org/3/movie/"+id+"/similar?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var len = data.data.results.length;
        var result = '{"resultList":['
        for(var i = 0; i < len; i++){
            if(i != 0){
                result += ',';
            }
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"}';
        }        
        result += ']}';
        console.log(result);
        
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})
module.exports = router;
