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
router.get('/toprated/movie', async function(req, res){
    var api_key = config.API_KEY;  
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+api_key+"&language=en-US&page=1";
    const data = await axios.get(url);
    var result = await getMovieList(data);    
    res.json(JSON.parse(result));
})

//popular movies
router.get('/popular/movie', async function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/movie/popular?api_key="+api_key+"&language=en-US&page=1";
    const data = await axios.get(url);
    var result = await getMovieList(data);
    res.json(JSON.parse(result));
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
router.get('/popular/tv', async function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/tv/popular?api_key="+api_key+"&language=en-US&page=1";
    const data = await axios.get(url)
    var result = await getTVList(data);
    res.json(JSON.parse(result));
})

//top rated tv
router.get('/toprated/tv', async function(req, res){
    var api_key = config.API_KEY;    
    let url = "https://api.themoviedb.org/3/tv/top_rated?api_key="+api_key+"&language=en-US&page=1";
    const data = await axios.get(url)
    var result = await getTVList(data);
    res.json(JSON.parse(result));
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


/// helper function
async function getMovieList(data){
    var result = '{"results":['  
    var len = data.data.results.length;
    len = Math.min(len, 20);
    for(var i = 0; i < len; i++){     
        result += '{'
            + '"id":' + data.data.results[i].id + ','
            + '"title":"' + data.data.results[i].title + '",'
            + '"date":"' + data.data.results[i].release_date.slice(0, 4) + '",'
            + '"media_type":"movie",'
        result += '"video":'+ await getVideoByID(data.data.results[i].id, 'movie')+','
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

async function getTVList(data){
    var result = '{"results":['  
    var len = data.data.results.length;
    len = Math.min(len, 20);
    for(var i = 0; i < len; i++){     
        result += '{'
            + '"id":' + data.data.results[i].id + ','
            + '"title":"' + data.data.results[i].name + '",'
            + '"date":"' + data.data.results[i].first_air_date.slice(0, 4) + '",'
            + '"media_type":"tv",'
        result += '"video":'+ await getVideoByID(data.data.results[i].id, 'tv')+','
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

async function getVideoByID(id, type){    
    var api_key = config.API_KEY; 
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/videos?api_key="+api_key+"&language=en-US&page=1";
    var result = '';
    const data = await axios.get(url);
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
    return result
}

module.exports = router;
