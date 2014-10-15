/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-5-11
 * Time: 上午10:40
 * To change this template use File | Settings | File Templates.
 */
var mongo =require("../lib/mongoClient.js"),
    util = require("util"),
    handleBase = require("./../lib/handleAppBase.js").handleBase;

var _handler = {
    requeststate:function(header,response){
        var opt ={
            collection:"static",
            query:{},
            fields:{
                _id:0,
                lastdate:1,
                time:1,
                path:1
            },
            sort:[["time","desc"]]
        };
        if(!header.cookie.Cid){
            var f = (new Date()).getTime()+3600*24*1000*30;
            response.setCookie({
                key:"Cid",
                value:utility.Guid("b"),
                expires:new Date(f).toGMTString()
            })
        }
        mongo.query(opt,function(err,pagedata){
                if(err){
                    utility.handleException(err);
                    response.end(configuration.config.language.serverErr);
                };
                pagedata.HandleTime = new Date() - header.starthandletime;
                response.end(JSON.stringify(pagedata));
            })
        //}
    }
};

var app = new handleBase("static",_handler);

function handle(header,response){
   app.handle(header,response);
}

exports.handle = handle;