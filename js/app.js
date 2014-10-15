/**
 * Created by Huang on 14-3-16.
 */

angular.module("blogApp",[
        "ngRoute",
        "articleControllers",
        "articleServices"
    ]).config(["$routeProvider",function($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"./template/index.htm",
                //controller:"CarouselDemoCtrl",
                controller:"indexCtrl"
            }).when("/article/:type_int",{
                templateUrl:"./template/list.htm",
                controller:"typeListCtrl"
            }).when("/about",{
                templateUrl:"./template/about.htm"
            }).when("/detail/:id",{
                templateUrl:"./template/detail.htm",
                controller:"detailCtrl"
            }).when("/admin",{
                templateUrl:"./template/admin.htm",
                controller:"adminCtrl"
            }).when("/circle/:id?",{
                templateUrl:"./template/circle.htm",
                controller:"circleCtrl"
            }).otherwise({
                redirectTo:"/home"
            });

    }])