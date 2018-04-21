// nodejs 基础8

var fs = require("fs");

var myReadStream = fs.createReadStream(__dirname + "/readMe.txt");
// var myReadStream = fs.createReadStream(__dirname + "/readMe.txt","utf8");

var data = "";

myReadStream.on("data", function(chunk){
    data += chunk
});



