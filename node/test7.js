// nodejs 基础7

var fs = require("fs");

fs.mkdir("stuff", function(){
    fs.readFile("readMe.txt", "utf8", function(err, data){
        fs.writeFile("./stuff/writeMe.txt",data,function(){
            console.log("copy successfully");
        })
    });
});

// fs.unlink("writeMe2.txt", function(){
//     console.log("delete writeMe.txt file");
// });

