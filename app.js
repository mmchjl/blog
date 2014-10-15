var server = require("./server.js");
var util = require("util");
//console.log(global.configuration);
if(configuration.config.runtime.isOpenUnCaughtException){
    process.on("uncaughtException",function(err){
        utility.handleException(err);
    });
}
server.listen(configuration.config.runtime.appport);

