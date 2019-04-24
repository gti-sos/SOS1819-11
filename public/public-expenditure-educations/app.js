/*global angular*/

angular.module("App", [ "ngRoute", "ngDialog"]).config(function($routeProvider,$locationProvider) {
    
    
    /* for delete /#!*/
    
    
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: true
    });
    
    
    $routeProvider.
    when("/ui/v1/public-expenditure-educations", {
        templateUrl: "/public-expenditure-educations/views/index.html",
        controller: "EducatiosListCtrl"
       
    }).
    when("/ui/v1/public-expenditure-educations/:country/:year", {
        templateUrl: "/public-expenditure-educations/views/educationsEdit.html",
        controller: "EducatiosEditCtrl"
       
    });
    
});

console.log("App initialized!");