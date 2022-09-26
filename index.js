
var port = 8085;
var hostName = 'karthik';
var express = require('express');
var app = express();
	app.set('superSecret', 'iamkarthik');
var jwt = require('jsonwebtoken');
var apiRoutes = express.Router();
	app.use('/', apiRoutes);
var bodyParser = require('body-parser');
//var serveStatic = require('serve-static');
var homePage = __dirname+'/form.html';
//var Movies = require(__dirname+'/Movies.js');
var Users = require(__dirname+'/Userpass.js');
//var DeviceIds = require(__dirname+'/deviceIdsForPush.js');
var tokenVerification = require(__dirname+'/tokenVerification.js');
var imgPath = __dirname+'/Raajakumara.png';
var fs = require('fs');
//var loginPage = __dirname+'/../Movies/WebContent/index.html';
var loginPage = fs.readFile(__dirname+'/index.html');
//var formidable = require('formidable');
/*var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.type = "multipart";*/
/*var connectModule = require('connect');
var http = require('http');
//var express = require('express');
//express().use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));
var handleRequest = function(req,res){
    /!*var user = req.query[userName];
    var pass = req.params.password;
    //res.status().send(user,pass);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        firstName: req.params.userName || null,
        lastName: req.params.password || null
    }));
    console.log('Data received successfully - UserName:'+user+' and Password:'+pass+req);*!/
};
connectModule().use(function(req,res){

});
//express().post('/form', handleRequest(req,res)).listen(port);
http.createServer(connectModule()).listen(port);
	console.log('Server running successfully at port : '+port);*/

var image = fs.readFileSync(imgPath);
apiRoutes.use(function(req, res, next,loginPage) {
    tokenVerification.verifyToken(jwt,req, res,next,loginPage);
});
apiRoutes.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(__dirname + '/public'));
apiRoutes.get('/',function(req,res){
	Users.homePage(req, res);
	//tokenVerification.verifyToken(jwt,req, res,next,loginPage);
    //res.sendFile(loginPage);
});
/*app.post('/form', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var user = req.body.userName;  //if requestBody-> req.body.userName
    var pass = req.body.password;  //if query-> req.query.userName
    var responseString = 'Data received successfully - UserName:'+user+' and Password:'+pass;
    res.send(
        JSON.stringify({
            Username: user || null,
            Password: pass || null,
            response: responseString
        })
    );
    console.log(responseString);
});*/
apiRoutes.post('/services/login',function(req,res){
	Users.authenticate(jwt,req, res);
});
apiRoutes.post('/services/insertUser',function(req,res){
	Users.addUsers(req, res);
});
apiRoutes.post('/services/insertMovie',function(req,res){
    Movies.addMovies(req, res,image);
});
apiRoutes.get('/services/findMovie',function(req,res){
    Movies.findMovies(req, res);
});
apiRoutes.get('/services/findImage',function(req,res){
    Movies.findImage(req, res);
});
apiRoutes.get('/services/insertDeviceId',function(req,res){
    DeviceIds.addDeviceIds(req, res);
});
app.listen(port);
console.log('Server running successfully at port : '+port);
