/*
//web-push configuration
var webPush = require('web-push');
var fs = require('fs');

//web-push key read or set
var publicKey = undefined;
var privateKey = undefined;
const GENERATE_NEW_KEY = false;
if(GENERATE_NEW_KEY){
    const vapidKeys = webPush.generateVAPIDKeys();
    publicKey = vapidKeys.publicKey;
    var stream_public = fs.createWriteStream('../key/publicKey');
    stream_public.once('open', function(fd){
        stream_public.write(vapidKeys.publicKey);
        stream_public.end();
    });
    var stream_private = fs.createWriteStream('../key/privateKey');
    privateKey = vapidKeys.privateKey;
    stream_private.once('open', function(fd){
        stream_private.write(vapidKeys.privateKey);
        stream_private.end();
    });
}
else{
    publicKey = fs.readFileSync('./key/publicKey');
    privateKey = fs.readFileSync('./key/privateKey');
}
//waiting for key read
while(publicKey === undefined || privateKey === undefined){
    console.log("waiting");
}
console.log("publicKey : ", publicKey.toString());
console.log("privateKey: ", privateKey.toString());
//web-push key setup
webPush.setVapidDetails('mailto:clplanet26@gmail.com',publicKey.toString(),privateKey.toString());
*/


var notifier =  function(){

    var queue = require("./Queue");
    this.queue = new queue();//지금은 쓰지 않음.

};
var express = require('express');
notifier.prototype.router = express.Router();

notifier.prototype.router.all('/', function(req, res, next) {
    res.send(""+notifier.prototype.message);
});
notifier.prototype.router.post('/add', function(req, res, next){

});
notifier.prototype.router.get('/get', function(req, res, next){
    var addrlist_path = "./data/parse/addrlist.json";
    var addrlist = JSON.parse(require('fs').readFileSync(addrlist_path).toString());//target_number 및 target_selector정보 받기
    res.send(""+JSON.stringify(Object.keys(addrlist)));
});

notifier.prototype.spread = function(){//추후 구현
};
notifier.prototype.newPost = function(str){
    this.message = str;
};
notifier.prototype.message = 0;
//setInterval(()=>{notifier.prototype.message+=1;},3000);

module.exports = notifier;