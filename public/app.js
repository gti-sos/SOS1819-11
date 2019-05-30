/*global angular*/

angular.module("App", ["ngRoute", "ngDialog"]).config(function($routeProvider) {


    $routeProvider.
    when("/", {
        templateUrl: "info.html",

    }).
    when("/integrations", {
        templateUrl: "integrations.html",

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
    when("/integrations/sos03proxy", {
        templateUrl: "/public-expenditure-educations/views/apiProxySOS03.html",
        controller: "ApiProxySOS03"

    })
    .
    when("/integrations/sos02", {
        templateUrl: "/public-expenditure-educations/views/apiSOS02.html",
        controller: "ApiSOS02"

    })
    .
    when("/integrations/sos04", {
        templateUrl: "/public-expenditure-educations/views/apiSOS04.html",
        controller: "ApiSOS04"

    })
    .
    when("/integrations/sos08", {
        templateUrl: "/public-expenditure-educations/views/apiSOS08.html",
        controller: "ApiSOS08"

    })
    .
    when("/integrations/sos09", {
        templateUrl: "/public-expenditure-educations/views/apiSOS09.html",
        controller: "ApiSOS09"

    })
    .
    when("/integrations/sos07", {
        templateUrl: "/public-expenditure-educations/views/apiSOS07.html",
        controller: "ApiSOS07"

    })
    .
    when("/integrations/sos11", {
        templateUrl: "/public-expenditure-educations/views/apiSOS11.html",
        controller: "ApiSOS11"

    })
    .
    when("/integrations/sos06", {
        templateUrl: "/public-expenditure-educations/views/apiSOS06.html",
        controller: "ApiSOS06"

    })
    .
    when("/integrations/apiNFLArres", {
        templateUrl: "/public-expenditure-educations/views/apiNFLArrest.html",
        controller: "ApiNFLArrest"

    }).
    when("/integrations/apiEarthguakeIceland", {
        templateUrl: "/public-expenditure-educations/views/apiEarthguakeIceland.html",
        controller: "ApiEarthguakeIceland"

    }).
    
    
    //------------------------------------------------- General-Public-Expenses------------------------------------------------        
    when("/ui/v1/general-public-expenses", {
        controller: "GeneralListCtrl",
        templateUrl: "/general-public-expenses-app/views/list.html"


    }).
    when("/ui/v1/general-public-expenses/edit/:country/:year", {
        controller: "GeneralEditCtrl",
        templateUrl: "/general-public-expenses-app/views/edit.html"


    })
    
     //------------------------------------------------- analytics TODO EL GRUPO------------------------------------------------ 
    .
    when("/analytics", {
        controller: "AnalyticsCtrl",
        templateUrl: "analytics.html"


    });   
   
    


});

console.log("App initialized!");
