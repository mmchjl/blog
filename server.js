/*var http = require('http');
var port = 18080;
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World!!You</p>');
}).listen(port);*/

var init =require("./init.js");
var http = require("http");
var util = require("util");
var route =require("./route.js");

var server = http.createServer();
server.on("request",handleRequest)
server.on("listening",function(){
    startScheduleTask();
    console.log("Server Start");
})
function handleRequest(request,response){
    route.route(request,response)
}

/*
 * 开始定时任务
 * */
function startScheduleTask(){
    var len = configuration.length;
    if(len >0){
        for(var i =0;i<len;i++){
            var temp = configuration.scheduleTask[i];
            if(temp instanceof Function){
                try{
                    temp();
                }catch(e){
                    utility.handleException(e);
                }
            }
        }
    }
}


function listen(port){
    if(port==undefined){
        port = 8080;
    }
    server.listen(port);
}

exports.listen = listen;
