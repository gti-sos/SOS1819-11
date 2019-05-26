/*global angular*/

angular.module("App", ["ngRoute", "ngDialog"]).config(function($routeProvider) {


    $routeProvider.
    when("/", {
        templateUrl: "info.html",

    }).

    // -------------------------------------------------- PUBLIC-HEALTH-EXPENSES ------------------------------------------------------
    when("/ui/v1/public-health-expenses", {
        controller: "ListCtrl",
        templateUrl: "/public-health-expenses/views/list.html"
    }).
    when("/ui/v1/public-health-expenses/edit/:country/:year", {
        controller: "EditCtrl",
        templateUrl: "/public-health-expenses/views/edit.html"
    }).

    // ----------------------------------------------- Public-expenditure-educations----------------------------------   
    when("/minipostman", {
        templateUrl: "/public-expenditure-educations/views/miniPostman.html",
        controller: "MainCtrl"
    }).
    when("/ui/v1/public-expenditure-educations", {
        templateUrl: "/public-expenditure-educations/views/educationsList.html",
        controller: "EducatiosListCtrl"

    }).
    when("/ui/v1/public-expenditure-educations/:country/:year", {
        templateUrl: "/public-expenditure-educations/views/educationsEdit.html",
        controller: "EducatiosEditCtrl"

    }).
    when("/views/educations", {
        templateUrl: "/public-expenditure-educations/views/educationsViews.html",
        controller: "EducationsViews"

    }).

    //------------------------------------------------- General-Public-Expenses------------------------------------------------        
    when("/ui/v1/general-public-expenses", {
        controller: "GeneralListCtrl",
        templateUrl: "/general-public-expenses-app/views/list.html"


    }).
    when("/ui/v1/general-public-expenses/edit/:country/:year", {
        controller: "GeneralEditCtrl",
        templateUrl: "/general-public-expenses-app/views/edit.html"


    });


});

console.log("App initialized!");
