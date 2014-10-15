/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-6-29
 * Time: 下午8:38
 * To change this template use File | Settings | File Templates.
 */

var mongo = require("../lib/mongoClient.js");

var _collection = "area";



function handle(header,response){
    var action = header.action;
    response.writeHead(200,{
        "Content-Type":"text/plain"
    });
    if(_handler[action]!=undefined){
        _handler[action](header,response);
    }else{
        response.end();
    }
}

var _handler = {
    getlist:function(header,response){
       var option={
            collection:"area"
       };
       mongo.query(option,function(err,data){
           if(err){
               utility.handleException(err);
               response.end(JSON.stringify(data));
           }else{
               response.end(JSON.stringify(data));
           }
           response.end();
       });
    },
    add:function(header,response){
        var option = {
            collection:_collection,
            newObject:utility.objectValid(header.fields)
        };
        console.dir(header);
        mongo.findOne({
            collection:_collection,
            query:{
                name_str:header.fields.name_str
            }
        },function(err,data){
            if(err) utility.handleException(err);
            if(utility.isNull(data)){
                //不存在
                mongo.insert(option,function(err,data){
                    if(err) utility.handleException(err);
                    if(!utility.isNull(data)){
                        response.endJson({result:true,code:1});
                    }else{
                        response.endJson({result:false,code:0});
                    }
                })
            }else{
                response.endJson({result:false,code:-1});
            }
        })
    },
    remove:function(header,response){
       var option = {
           collection:_collection,
           query:{
               _id:header.queryString._id
           }
       };
        mongo.remove(option,function(err,data){
            if(err) utility.handleException(err);
            if(data){
                response.endJson({result:true,code:1});
            }else{
                response.endJson({result:false,code:0});
            }
        })
    },
    update:function(header,response){
        var option = {
            collection:_collection,
            query:{
                _id:header.queryString._id
            },
            newObject:{
                $set:{
                    name_str:header.queryString.name_str
                }
            }
        };
        mongo.update(option,function(err,data){
            if(err) utility.handleException(err);
            if(data){
                response.endJson({result:true,code:1});
            }else{
                response.endJson({result:false,code:0});
            }
        })
    },
    md5:function(header,response){
        var temp = header.queryString.str||"";
        response.end(utility.MD5(temp,"md5","base64"));
    }
};

module.exports.handle = handle;