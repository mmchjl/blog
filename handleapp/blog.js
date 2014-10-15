/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-6-27
 * Time: 上午9:27
 * To change this template use File | Settings | File Templates.
 */
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
        var q = {};
        for(var i in header.queryString){
            if(i!="_"){
                q[i] = header.queryString[i];
                if(i.split("_")[1]=="str"){
                    q[i] = new RegExp(header.queryString[i]);
                }
            }
        }
        var opt ={
            collection:"blog.user",
            query:q,
            fields:{}
        };
        console.dir(opt);
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
        mongo.findOne({
            collection:"blog.user",
            query:{
                name_str:header.fields.name_str
            }
        },function(err,data){
            if(err){
               utility.handleException(err);
                response.end(JSON.stringify({result:false,code:-1}));
            }else{
                if(utility.isNull(data)){
                    mongo.insert(option,function(err,data){
                        if(err){
                            response.write(JSON.stringify({result:false,code:-1}));
                        }else{
                            response.write(JSON.stringify({result:true,code:1}));
                        }
                        response.end();
                    });
                }else{
                    response.end(JSON.stringify({result:false,code:0}));
                }
            }
        })
    },
    remove:function(header,response){
        var opt = {
            collection:"blog.user",
            query:{
                    _id:header.queryString._id
            }
        };
        utility.debug(opt);
        mongo.remove(opt,function(err,data){
            if(err){
                response.write(JSON.stringify({result:false}));
            }else{
                response.write(JSON.stringify({result:true}));
            }
            response.end();
        })
    },
    update:function(header,response){
        var opt = {
            collection:"blog.user",
            query:{
                _id:header.queryString._id
            },
            newObject:{
                $set:{
                    name_str:header.queryString.name_str
                }
            }
        };
        mongo.update(opt,function(err,data){
            if(err){
                response.write(JSON.stringify({result:false}));
            }else{
                response.write(JSON.stringify({result:true}));
            }
            response.end();
        })
    },
    md:function(header,response){
        var _str = header.queryString.str||"";
        response.end(utility.MD5(_str));
        console.log((new Date()-header.starthandletime));
    }
};

exports.handle=handle;