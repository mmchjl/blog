var mongo = require("../lib/mongoClient.js"),
	util = require("util");


function handle(header,response){
	response.writeHead(200,{
		"Content-Type":"text/plain"
	});
	var action = header.action;
    if(_handler[action]!=undefined){
        _handler[action](header,response);
    }else{
        response.end();
    }
}

var _handler = {
	getlist:function(header,response){
		var opt ={
			collection:"blog.user",
            query:{},
            fields:{}
		};
        //response.setCookie({});
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.end(configuration.config.language.serverErr);
            }
            response.end(JSON.stringify(data));
        })

	},
	add:function(header,response){
		var option ={
			collection:"blog.user",
            newObject:utility.objectValid(header.fields)
		};
        response.write(JSON.stringify(option));
        response.end();
	}
};

exports.handle=handle;