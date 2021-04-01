var express = require('express');
var axios = require('axios');
var config = require('../config.json');
var router = express.Router();

// cast
router.get('/:type/:id', function(req, res){
    var api_key = config.API_KEY;
    var type = req.params.type;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/"+type+"/"+id+"/credits?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        var result = '{"castList":['
        var len = data.data.cast.length;
        for(var i = 0; i < len; i++){
            if(data.data.cast[i].profile_path){
                if(i != 0){
                    result += ',';
                }
                result += '{"id": "' + data.data.cast[i].id + '",'
                    + '"character": "' + data.data.cast[i].character + '",'
                    + '"name": "' + data.data.cast[i].name + '",'
                    + '"profile_path": "https://image.tmdb.org/t/p/w500/' + data.data.cast[i].profile_path + '"}';
            }
        }  
        result += ']}';
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})

// cast detail
router.get('/:id', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/person/"+id+"?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {
        // var result = '{"birthday": "' + data.data.birthday + '",'
        //     + '"name": "' + data.data.name + '",'
        //     + '"homepage": "' + data.data.homepage + '",'
        //     + '"known_for_department": "' + data.data.known_for_department + '",'
        //     // + '"biography": "' + data.data.biography + '",'
        //     + '"also_known_as": ['; 
            
        // var len = data.data.also_known_as.length;
        // for(var i = 0; i < len; i++){
        //     console.log(data.data.also_known_as[i]);
        //     var name = data.data.also_known_as[i].replaceAll(/\"/g, '\\"');
        //     console.log(name);
            
        //     if(i == len - 1){
        //         result += '"' + name + '"';
        //     }else{
        //         result += '"' + name + ',",';
        //     }
        // }
        // result += '],';
        
        // if(data.data.gender == 1){
        //     result += '"gender": "Female"}';
        // }else if(data.data.gender == 2){
        //     result += '"gender": "Male"}';
        // }else{
        //     result += '"gender": "Undefined"}';
        // }
        // console.log(result);
        res.json(data.data);
    }).catch(err => {
        res.send(err);
    })
})

// external cast
router.get('/:id/ex/share', function(req, res){
    var api_key = config.API_KEY;
    var id = req.params.id;
    let url = "https://api.themoviedb.org/3/person/"+id+"/external_ids?api_key="+api_key+"&language=en-US&page=1";
    axios.get(url).then(data => {        
        var result = '{"imdb_id": "' + data.data.imdb_id + '",'
            + '"facebook_id": "' + data.data.facebook_id + '",'
            + '"instagram_id": "' + data.data.instagram_id + '",'
            + '"twitter_id": "' + data.data.twitter_id + '"}';
        res.json(JSON.parse(result));
    }).catch(err => {
        res.send(err);
    })
})
module.exports = router;
