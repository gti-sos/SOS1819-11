/* global angular */
angular
    .module("GeneralPublicExpensesApp", ["ngRoute"])
    .config(function($routerProvider){
        $routerProvider
            .when("/",{
               controller : "ListCtrl",
               templateUrl : "list.hml"
            });
    });
    
console.log("App GeneralPublicExpensesApp initialized");