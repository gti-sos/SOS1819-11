/*global angular*/

angular.module("App", [ "ngRoute", "ngDialog"]).config(function($routeProvider,$locationProvider) {
    
    
    /* for delete /#!*/
    
    
   
    
    
    $routeProvider.
    when("/ui/v1/public-expenditure-educations/:country/:year", {
        templateUrl: "/public-expenditure-educations/views/educationsEdit.html",
        controller: "EducatiosEditCtrl"
       
    });
    
});

console.log("App initialized!");