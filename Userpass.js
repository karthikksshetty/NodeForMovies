/**
 * Created by Karthik KS on 29-04-2017.
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    Name: String,
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true }/*,
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date*/
});

// the schema is useless so far
// we need to create a model using it
var UserModel = mongoose.model('Users', userSchema);
mongoose.connect('mongodb://localhost/users',function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to Users MongoDB server.");
    }
});
// make this available to our users in our Node applications
module.exports.addUsers = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var userData = {
    	UserName: req.body.userName,
        Password: req.body.password,
        Name:req.body.name
    };
    var user = new UserModel(userData);
    user.save(function(error){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("User saved");
            var response = "User inserted successfully.";
            res.send(response);
            console.log(response);
            return response;
        }
    });
}
module.exports.authenticate = function(jwt,req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // find the user
    UserModel.findOne({
    	UserName: req.body.userName
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }else if (user) {
	        // check if password matches
	        if (user.Password != req.body.password) {
	          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	        }else {
		          // if user is found and password is right
		          // create a token with only our given payload
	        	// we don't want to pass in the entire user since that has the password
		      const payload = {
		        admin: user.admin 
		      };
	          var token = jwt.sign(payload, app.get('superSecret'), {
	            expiresInMinutes: 5 // expires in 24 hours
	          });
		
	          // return the information including token as JSON
	          res.json({
	            success: true,
	            message: 'Enjoy your token!',
	            token: token
	          });
	        }   

      }

    });
    
    var userData = {
    	UserName: req.body.userName,
        Password: req.body.password,
        Name:req.body.name
    };
    var user = new UserModel(userData);
    user.save(function(error){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("User saved");
            var response = "User inserted successfully.";
            res.send(response);
            console.log(response);
            return response;
        }
    });
}
module.exports.dummyAddUser = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var userData = {
    	UserName: "karthik",
        Password: "shetty",
        Name:"Karthik Shetty"
    };
    var user = new UserModel(userData);
    user.save(function(error){
        if(error){
            return error;
            res.send(error);
            console.log(error);
        }
        else{
            console.log("User saved");
            var response = userData.Name+" inserted successfully.";
            res.send(response);
            console.log(response);
            return response;
        }
    });
}
module.exports.homePage = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var fs = require('fs');
    var loginPage = fs.readFile(__dirname+'/index.html');
    res.send(loginPage);
}