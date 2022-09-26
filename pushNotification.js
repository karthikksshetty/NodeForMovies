/**
 * Created by Karthik KS on 10-07-2017.
 */
var gcm = require('node-gcm');

var DeviceIds = require(__dirname+'/deviceIdsForPush.js');
var ids = DeviceIds.getIds();
// Create a message
// ... with default values
var message = new gcm.Message();

// ... or some given values
/*var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed if your app is in the background."
    }
});

// Change the message data
// ... as key-value
message.addData('key1','message1');
message.addData('key2','message2');

// ... or as a data object (overwrites previous data object)
message.addData({
    key1: 'message1',
    key2: 'message2'
});*/
message.addData('title', 'Large Circular Icon');
message.addData('message', 'Loaded from URL');
message.addData('image', 'https://pbs.twimg.com/profile_images/837060031895896065/VHIQ4oUf_400x400.jpg');
message.addData('image-type', 'circular');
// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyAWis2RNvJx99YWG74_RHjrlwemgd-Yltc');

// Add the registration tokens of the devices you want to send to
var registrationTokens = [];
for(var i=0;i<ids.length;i++){
    registrationTokens.push(ids[i]);
}
//registrationTokens.push('regToken2');

// Send the message
// ... trying only once
/*sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
    if(err) console.error(err);
    else    console.log(response);
});

// ... or retrying
sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});*/

// ... or retrying a specific number of times (10)
sender.send(message, { registrationTokens: registrationTokens }, 2, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});