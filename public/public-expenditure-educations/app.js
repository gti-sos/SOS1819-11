/*global angular*/

angular.module("App", [ "ngRoute", "ngDialog"]).config(function($routeProvider,$locationProvider) {
    
    
    /* for delete /#!*/
    
    
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    });
    
    
    $routeProvider.
    when("/minipostman/", {
        templateUrl: "/public-expenditure-educations/views/miniPostman.html",
        controller: "MainCtrl"
    }).
    when("/ui/v1/public-expenditure-educations/", {
        templateUrl: "/public-expenditure-educations/views/educationsList.html",
        controller: "EducatiosListCtrl"
       
    }).
    when("/ui/v1/public-expenditure-educations/:country/:year", {
        templateUrl: "/public-expenditure-educations/views/educationsEdit.html",
        controller: "EducatiosEditCtrl"
       
    });
    
});

console.log("App initialized!");