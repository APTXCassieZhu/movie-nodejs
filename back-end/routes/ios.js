var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// now play for movie
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
                result += '"backdrop_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"backdrop_path":"https://cinemaone.net/images/movie_placeholder.png"';
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

//top rated movies
router.get('/toprated/movie', function(req, res){
    var api_key = config.API_KEY;  
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = getMovieList(data);
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
        var result = getMovieList(data);
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



//trending tv
router.get('/trending/tv', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/trending/tv/day?api_key="+api_key;
    axios.get(url).then(data => {
        var result = '{"results":['  
        for(var i = 0; i < 5; i++){
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"title":"' + data.data.results[i].name + '",'
                + '"media_type":"tv",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"';
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

//popular tv
router.get('/popular/tv', function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/tv/popular?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = getTVList(data);
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
        var result = getTVList(data);
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// for both
router.get('/video/:type/:id', function(req, res){
    var type = req.params.type; 
    var id = req.params.id
    var api_key = config.API_KEY; 
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/videos?api_key="+api_key+"&language=en-US&page=1";
    var result = '';
    axios.get(url).then(data => {        
        result = '{'
        var len = data.data.results.length;
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
        if(result == '{'){
            result += '"site": "Youtube",'
                + '"type": "fake",'
                + '"name": "undefined",' 
                + '"key": "tzkWB85ULJY"}';
        }    
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

router.get('/detail/:type/:id', function(req, res){
    var type = req.params.type; 
    var id = req.params.id
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{'  
        if(type == 'movie'){
            result += '"title":"' + data.data.title + '",'
            + '"release_date": "' + data.data.release_date.slice(0,4) + '",';
        }else{
            result += '"title":"' + data.data.name + '",'
            + '"release_date": "' + data.data.first_air_date.slice(0,4) + '",';
        }
        
        result += '"overview": "' + data.data.overview + '",'
            + '"vote_average": "' + data.data.vote_average + '",'
            + '"genres": "';
        var len = data.data.genres.length;
        for(var i = 0; i < len; i++){
            if(i == len - 1){
                result += data.data.genres[i].name;
            }else{
                result += data.data.genres[i].name + ', ';
            }
        }
        result += '",'
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

// cast
router.get('/cast/:type/:id', function(req, res){
    var api_key = config.API_KEY;
    var type = req.params.type;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/credits?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"castList":['
        var len = data.data.cast.length;
        len = Math.min(len, 10)
        for(var i = 0; i < len; i++){
            if(i != 0){
                result += ',';
            }
            result += '{"id": "' + data.data.cast[i].id + '",'
                + '"name": "' + data.data.cast[i].name + '",';

            if(data.data.cast[i].profile_path){
                result += '"profile_path": "https://image.tmdb.org/t/p/w500/' + data.data.cast[i].profile_path + '"}';
            }else{
                result += '"profile_path": "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png"}';
            }
        }  
        result += ']}';
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

// review
router.get('/review/:type/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;   
    var type = req.params.type  
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/reviews?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {        
        res.json(data.data.results);
    }).catch(err => {
        res.send(err);
    })
})

// recommendation
router.get('/recommend/:type/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;   
    var type = req.params.type  
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/recommendations?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {        
        var len = data.data.results.length;
        var result = '{"resultList":['
        for(var i = 0; i < len; i++){
            if(i != 0){
                result += ',';
            }
            result += '{'
                + '"id":' + data.data.results[i].id + ','
                + '"media_type":"'+type+'",';
            if(data.data.results[i].poster_path){
                result += '"poster_path":"https://image.tmdb.org/t/p/w500' + data.data.results[i].poster_path + '"}';
            }else{
                result += '"poster_path":"https://cinemaone.net/images/movie_placeholder.png"}';
            }
        }        
        result += ']}';        
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

/// helper function
function getMovieList(data){
    var result = '{"results":['  
    var len = data.data.results.length;
    len = Math.min(len, 20);
    for(var i = 0; i < len; i++){     
        result += '{'
            + '"id":' + data.data.results[i].id + ','
            + '"title":"' + data.data.results[i].title + '",'
            + '"date":"' + data.data.results[i].release_date.slice(0, 4) + '",'
            + '"media_type":"movie",'
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
    return result;
}

function getTVList(data){
    var result = '{"results":['  
    var len = data.data.results.length;
    len = Math.min(len, 20);
    for(var i = 0; i < len; i++){     
        result += '{'
            + '"id":' + data.data.results[i].id + ','
            + '"title":"' + data.data.results[i].name + '",'
            + '"date":"' + data.data.results[i].first_air_date.slice(0, 4) + '",'
            + '"media_type":"tv",'
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
    return result;
}

module.exports = router;
