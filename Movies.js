/**
 * Created by Karthik KS on 29-04-2017.
 */
var mongoose = require('mongoose');
var base64 = require('base-64');
//var multer  = require('multer');
//var upload = multer({dest: 'Images/'});
var castSchema = new mongoose.Schema({
    name: {type: String}
});
var moviesSchema = new mongoose.Schema({
    MovieName: {type: String, required: true, unique: true},
    Cast: [castSchema],
    Image: {data: Buffer, contentType: String}
});
var MovieModel = mongoose.model('Movies', moviesSchema);
mongoose.connect('mongodb://localhost/movies',function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to Movies MongoDB server.");
    }
});

module.exports.addMovies = function(req,res,image){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var castArray = [];
    for(var i=0;i<req.body.cast.length;i++){
        castArray.push({name:req.body.cast[i]})
    }
    var movieData = {
        MovieName: req.body.movieName,
        Cast: castArray,
        Image:{data:image,contentType:'image/png'}
    };
    var movie = new MovieModel(movieData);
    movie.save(function(error){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("Post saved");
            var response = "Movie "+req.body.movieName+" inserted successfully.";
            res.send(response);
            console.log(response);
            return response;
        }
    });
}

module.exports.findMovies = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    MovieModel.find({},'MovieName Cast',function(error,data){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("Found "+data.length+" records");
            var response = [];
            for(var i=0;i<data.length;i++){
                var cast = [];
                for(var j=0;j<data[i].Cast.length;j++){
                    cast.push(data[i].Cast[j].name);
                }
                response.push({
                    MovieName:data[i].MovieName,
                    Cast:cast
                });
            }
	        //var output = JSON.stringify(response);
	        res.json(response);
            console.log(response);
            return response;
        }
    });
}

module.exports.findImage = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    MovieModel.findOne({ MovieName:'Lakshmi'},function(error,data){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("Image found.");
            var imageString = base64.encode(data.Image);//(data.Image).toString('ascii');
            res.send(imageString);
        }
    });
}

