/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-8-11
 * Time: 下午10:36
 * To change this template use File | Settings | File Templates.
 */

var mongo = require("../lib/mongoClient.js"),
    handleBase = require("./../lib/handleAppBase.js").handleBase;

var _handle = {
    add:function(header,response){
       var obj = utility.objectValid(JSON.parse(header.fields.data));
        var item = {
            name_str:obj.name_str,
            addTime_date:(new Date()).getTime(),
            updateTime_date:(new Date()).getTime()
        };
       var opt ={
           collection:app.opt.collection,
           newObject:item
       }
        mongo.insert(opt,function(err,data){
            if(err){
                utility.handleException(err);
                response.endJson({result:false,code:500});
            }
            return response.endJson({result:true,code:200})
        })
    },
    getlist:function(header,response){
        var opt = {
            collection:app.opt.collection
        };
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,code:500});
            }
            return response.endJson({result:true,data:data})
        })
    },
    update:function(header,response){
       var id = header.queryString.id,
           name_str = header.queryString.name_str;
        var opt={
           collection:app.opt.collection,
            query:{
                _id:id
            },
            newObject:{
                $set:{
                    name_str:name_str,
                    updateTime_date:(new Date()).getTime()
                }
            }
        }
        mongo.update(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,code:500})
            }
            return response.endJson({result:true})
        })
    },
    remove:function(header,response){
        var id = header.queryString.id;
        var opt={
            collection:app.opt.collection,
            query:{
                _id:id
            }
        };
        mongo.remove(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,code:500})
            }
            response.endJson({result:true});
        })
    }
};

var app = new  handleBase("menu",_handle);

app.isAuthorization = false;

function handle(header,response){
    return app.handle(header,response);
}

module.exports.handle = handle;