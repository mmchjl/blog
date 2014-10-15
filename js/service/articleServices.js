/**
 * Created by Huang on 14-3-16.
 */

//var articleServices= angular.module("articleServices",["ngResource"]);

angular.module("articleServices",["ngResource"]).factory("article",["$resource",function($resource){
        return $resource('article/:action',{},{
            save:{method:"POST",params:{action:'update'}},
            comment:{method:"POST",params:{action:'comment'}},
            thumb:{method:"POST",params:{action:'thumb'}},
            admin:{method:"GET",params:{action:'admin'}},
            addArticle:{method:"POST",params:{action:'add'}}
           // removecomment:{method:"POST",params:{action:'removecomment'}}
        })
    }]);

angular.module("authorizationService",["ngResource"]).factory("authorization",["$resource",function($resource){
    return $resource("authorization/:action",{},{
        login:{method:"POST",params:{action:"login"}},
        islogin:{method:"GET",params:{action:"islogin"}}
    });
}]);