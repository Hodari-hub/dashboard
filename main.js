const  fs  = require("fs");
var http = require("http");

const server=http.createServer(function(req,res){
    console.log(req.url);
    res.setHeader("Content-Type","text/html");
    var path="./views/";
    
    switch(req.url){
        case "/":
            path+="index.html";
            res.statusCode=200;
            break;
        case "/about":
            res.statusCode = 200;
            path+="about.html";
            break;
        case "/about-me":
            res.statusCode = 301;
            res.setHeader("Location","/about");
            res.end();
            break;
        default:
            path+="404.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.end(data);
        }
    });
});

server.listen(3000,"localhost",()=>{
    console.log("server is listerning on the 3000 port!");
});