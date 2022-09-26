/**
 * Created by Karthik KS on 10-07-2017.
 */
var mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
    deviceId: {type: String, required: true, unique: true}
});
var DeviceModel = mongoose.model('DeviceIds', deviceSchema);
mongoose.connect('mongodb://localhost/deviceids',function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to DI MongoDB server.");
    }
});

module.exports.addDeviceIds = function(req,res){
    var requestData = {
        deviceId: req.query.movieName
    };
    var id = new DeviceModel(requestData);
    id.save(function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log("Device id saved");
            var response = "Device id "+req.query.movieName+" inserted successfully.";
            console.log(response);
        }
    });
}

module.exports.getIds = function(req,res) {
    DeviceModel.find({}, '', function (error, data) {
        if (error) {
            return '';
            console.log(error);
        }
        else {
            console.log("Found " + data.length + " ids");
            var response = [];
            for (var i = 0; i < data.length; i++) {
                response.push(data[i].deviceId);
            }
            //var output = JSON.stringify(response);
            return response;
        }
    });
}