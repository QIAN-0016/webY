// nodejs 基础6

var fs = require("fs");

var readMe = fs.readFile("readMe.txt","utf8", function(err, data){
    fs.writeFile("writeMe.txt",data, function(){
        console.log("writeme has finished");
    });
});


// 延迟
// var waitTill = new Date(new Date().getTime()+4*1000);
// while(waitTill > new Date()){}

console.log("finished");

//fs.writeFileSync("writeMe.txt", readMe);


