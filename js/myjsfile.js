if(!Namespace.Exists("area.control")){
    Namespace.Register("area.control");
    area.control={
        init:function(){
            $("#btn_areaBack").click(function(){
                NengLongTemplateLoad({
                    app:"index",
                    cmd:"bodyInit"
                });
            });

            $(".closed").click(function(){
                $(".txt").val("");
            });

            $("#btn_area_save").unbind("click").bind("click",function(){
                var name = $("#txt_area_add").val();
                Nenglong.Ajax.PostData("./area/add",{name_str:name,addDate_date:(new Date()).getTime(),adder_str:"黄俊乐"},function(data){
                    if(data.result){
                        NengLongTemplateReload();
                    }
                });
            });

            $(".delete").unbind("click").bind("click",function(){
                var _id = $(this).parent("td").parent("tr").attr("tid");
                $.get("./area/remove",{_id:_id},function(data){
                    var t = JSON.parse(data);
                    if(t.result){
                        NengLongTemplateReload();
                    }
                })
            })
        }
    };
}

if(!Namespace.Exists("index.control")){
    Namespace.Register("index.control");
    index.control={
        init:function(){
           $("#btn_area").click(function(){
               NengLongTemplateLoad({
                   app:"index",
                   cmd:"area"
               });
           });
        }
    };
}