var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// now play
router.get('/now_playing', function(req, res){
    var api_key = config.API_KEY;
    let url = "https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        // fetch top 5 
        var result = '{"results":['
        for(var i = 0; i < 5; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"media_type":"movie",';
            if(data.data.results[i].poster_path){
                result += '"backdrop_path":"https://image.tmdb.org/t/p/original' + data.data.results[i].backdrop_path + '"';
            }else{
                result += '"backdrop_path":"https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg"';
            }
            if(i != 4){
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

//popular movies
router.get('/popular/movie', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/movie/popular?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"media_type":"movie",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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

//top rated movies
router.get('/toprated/movie', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"media_type":"movie",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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

//trending movies
router.get('/trending/movie', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/trending/movie/day?api_key="+api_key;
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].title + '",'
                + '"media_type":"movie",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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

//popular tv
router.get('/popular/tv', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/tv/popular?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].name + '",'
                + '"media_type":"tv",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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

//top rated tv
router.get('/toprated/tv', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/tv/top_rated?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].name + '",'
                + '"media_type":"tv",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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

//trending tv
router.get('/trending/tv', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/trending/tv/day?api_key="+api_key;
    axios.get(url).then(data => {
        var result = '{"results":['  
        var len = data.data.results.length;
        for(var i = 0; i < len; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].name + '",'
                + '"media_type":"tv",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
            }
            if(i != len-1){
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
