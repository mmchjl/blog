/**
 * Created by Huang on 14-3-16.
 */

var articleControllers = angular.module("articleControllers",["ngRoute","ngSanitize","articleServices","authorizationService","ui.bootstrap"]);

articleControllers
    .controller("typeListCtrl",["$scope","$routeParams","article",function($scope,$routeParams,article){
        var typeInt = $routeParams.type_int||1;
        article.get({action:"getlist",type_int:typeInt},function(data){
            $scope.articles = data.data.list;
        });
        $scope.checkArticle=function(article){
            window.location="#/detail/"+article._id;
        }
    }])
    .controller("rangeListCtrl",["$scope","article",function($scope,artilce){
        artilce.get({action:"getrange"},function(data){
            $scope.titles = data.data.list;
        });
    }])
    .controller("detailCtrl",["$scope","$routeParams","article","authorization",function($scope,$routeParams,article,authorization){
        var id = $routeParams.id;
        article.get({action:"detail",id:id},function(data){
            $scope.article = data;
            $scope.myHTML = data.content_str;
        });
        $("#loginPanel").on("hidden",function(){
            $("#loginUserName").val("");
            $("#loginPassword").val("");
            $scope.uid="";
            $scope.pwd="";
        })
        $scope.comment = function(){
            article.comment({
                comment: $scope.commentText,
                email:$scope.email,
                nickName: $scope.nickName,
                id:$scope.article._id
            },function(data){
                if(data.result){
                    var _comment = {
                        addDate_date: (new Date()).getTime(),
                        commentId: "c55f66c8a0d0bb787d4e50d347e3488c",
                        comment_str: $scope.commentText,
                        mail_str:$scope.email,
                        nickname_str: $scope.nickName,
                        refComments: []
                    };
                    $scope.article.comments=$scope.article.comments||[];
                    $scope.article.comments.push(_comment);
                }else{
                    alert("评论失败！");
                }
                $scope.commentText="";
                $scope.email="";
                $scope.nickName="";
            });
        };
        $scope.thumb=function(obj){
            //alert(JSON.stringify(obj));
            article.thumb({
                articleId_str:obj.articleId,
                commentId_str:obj.commentId,
                type_int:obj.isYes?1:-1
            },function(data){
                if(data.result){
                    angular.forEach( $scope.article.comments,function(_comment){
                        if(_comment.commentId==obj.commentId){
                            if(obj.isYes){
                                if(!_comment.yes) _comment.yes=0;
                                _comment.yes++;
                            }else {
                                if(!_comment.no) _comment.no=0;
                                _comment.no++;
                            }
                        }
                    })
                }else{
                    alert(data.msg);
                }
            })
//            "./article/thumb",{
//                articleId_str:aid,
//                commentId_str:commentId,
//                type_int:type
        };
        $scope.removecomment=function(obj){
            //alert(JSON.stringify(obj));
            article.get({
                action:"removecomment",
                articleId:obj.articleId,
                commentId:obj.commentId
            },function(data){
                if(data){
                    var arr = $scope.article.comments;
                    $scope.article.comments = [];
                    angular.forEach(arr,function(item){
                        if(item.commentId!=obj.commentId){
                            $scope.article.comments.push(item);
                        }
                    });
                }else{
                   alert(data.msg);
                }
            })
        };
        $scope.hover=function(commentId){
            //alert(commentId);
            $("i[removeId="+commentId+"]").show();
        };
        $scope.out=function(commentId){
            //alert(commentId);
            $("i[removeId="+commentId+"]").hide();
        };
        $scope.login = function(){
            var userId = $scope.uid;
            var pwd = $scope.pwd;
            $("#loginPanel").modal('hide');
            authorization.login({
                account:userId,
                password:pwd
            },function(result){
                if(result.result){
                    window.location.hash = "#/admin"
                }else{
                    alert("login fail");
                }
            })
        };
        $scope.hi=function(){
            alert("hi")
        };
    }])
    .controller("indexCtrl",["$scope","$modal","$log","authorization","$rootScope",function($scope,$modal,$log,authorization,$rootScope){
        if(typeof(window.ModalInstanceCtrl)=="undefined"){
            window.ModalInstanceCtrl = function ($scope, $modalInstance, account,token) {


                $scope.ok = function (e) {
                    debugger;
                    if(typeof (e)=="undefined"||e.keyCode==13)
                    {
                        $modalInstance.close({
                            account: $("#loginUserName").val(),
                            token: $("#loginPassword").val()
                        });
                    }
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        }
        $scope.open = function () {
            $scope.account="";
            $scope.token="";
            var modalInstance = $modal.open({
                templateUrl: 'loginPanel.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    account:function(){
                        return $scope.account;
                    },
                    token:function(){
                        return $scope.token;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                var userId = result.account;
                var pwd = result.token;
                authorization.login({
                    account:userId,
                    password:pwd
                },function(_result){
                    if(_result.result){
                        window.location.hash = "#/admin"
                    }else{
                        window.alert("login fail");
                    }
                })
            });
        };
        $scope.myInterval = 2000;
        $scope.slides=[{
            image:"./img/wall/_1.jpg",
            text:"WALL"
        },{
            image:"./img/wall/_2.jpg",
            text:"WALL2"
        },{
            image:"./img/wall/_3.jpg",
            text:"WALL3"
        },{
            image:"./img/wall/_4.jpg",
            text:"WALL4"
        },{
            image:"./img/wall/_5.jpg",
            text:"WALL5"
        }];
    }])
    .controller("adminCtrl",["$scope","article",function($scope,article){
        article.admin({_:(new Date()).getTime()},function(result){
            if(!result.result){
                alert("请登录");
                window.location="#/home";
            }else {
                $scope.tech = result.data.tech;
                $scope.life = result.data.life;
                $scope.interst = result.data.interst;
            }
        });
        $scope.deleted=function(obj){
            article.get({action:"remove",id:obj._id},function(result){
                if(result.result){
                    var arr = [];
                    angular.forEach($scope[obj.tag],function(item){
                        if(item._id!=obj._id){
                            arr.push(item);
                        }
                    });
                    $scope[obj.tag] = arr;
                }
            });
        };
        $scope.modify=function(obj){
            window.location = "#/circle/"+obj._id;
        };
        $scope.Update=function(obj){
            window.location = "#/circle";
        }
}])
    .controller("circleCtrl",["$scope","$routeParams","article","authorization",function($scope,$routeParams,article,authorization){
        $scope.id = $routeParams.id;
        editor = KindEditor.create('#content', {
            cssPath : './css/prettify.css',
            uploadJson : './file/uploadimg',
            fileManagerJson : './asp.net/file_manager_json.ashx',
            allowFileManager : true,
            afterCreate : function() {
                var self = this;
            }
        });
        authorization.islogin({},function(data){
            if(data.code==100){
                alert("请登录");
                window.location = "#/home";
            }
        });
        if($scope.id){
            article.get({action:"detail",id:$scope.id,isAdmin:true},function(data){
                if(data.result) {
                    $scope.title = data.title_str;
                    $scope.synopsis = data.synopsis_str;
                    $scope.tags = data.tags;
                    $scope.articleType = data.type_int;
                    editor.html(data.content_str);
                }
            });
        }
        //$scope.title="I am a title!~";
        //$scope.synopsis="i am a synopsis";
        //$scope.tags=[{name_str:"tag11"},{name_str:"tag12"}];
        $scope.tagAdd=function(){
            $scope.tags = $scope.tags||[];
            if($scope.newTag!=""&&$scope.tags.length<3){
                $scope.tags.push({
                    name_str:$scope.newTag
                });
            }
            $scope.newTag="";
        }
        $scope.removeTag = function(tag){
            var arr = [];
            angular.forEach($scope.tags,function(obj){
                if(obj.name_str!=tag.name_str){
                    arr.push(obj);
                }
            });
            $scope.tags = arr;
        }
        $scope.submit=function(){
            var obj={};
            obj.id = $scope.id||0;
            obj.content_str = editor.html();
            obj.title_str = $scope.title;
            obj.synopsis_str = $scope.synopsis;
            obj.type_int = $scope.articleType;
            obj.updateTime_date=(new Date()).getTime();
            angular.forEach($scope.tags,function(tag){
                obj.tags=obj.tags||[];
                obj.tags.push(tag.name_str);
            });
            console.dir(obj);
            article.addArticle({data:obj},function(result){
                if(result.result){
                    window.location="#/admin";
                }
            });
        }
    }]);