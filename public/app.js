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
    when("/integrations/sos-g05", {
        controller: "apiSOS-G05",
        templateUrl: "/public-health-expenses/views/apiSOS-G05.html"
    }).
    when("/integrations/sos-g06", {
        controller: "apiSOS-G06",
        templateUrl: "/public-health-expenses/views/apiSOS-G06.html"
    }).
    when("/integrations/sos-g11", {
        controller: "apiSOS-G11",
        templateUrl: "/public-health-expenses/views/apiSOS-G11.html"
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
    }).

    when("/integrations/api-sos08", {
        templateUrl: "/general-public-expenses-app/views/SOS08.html",
        controller: "Api-sos08"
    }).

    when("/integrations/api-sos09", {
        templateUrl: "/general-public-expenses-app/views/SOS09.html",
        controller: "Api-sos09"
    }).

    when("/integrations/api-sos14", {
        templateUrl: "/general-public-expenses-app/views/SOS14.html",
        controller: "Api-sos14"
    }).

    when("/integrations/api-sos11", {
        templateUrl: "/general-public-expenses-app/views/SOS11.html",
        controller: "Api-sos11"
    }).

    when("/integrations/api-sos04", {
        templateUrl: "/general-public-expenses-app/views/SOS04.html",
        controller: "Api-sos04"
    }).

    when("/integrations/api-sos10", {
        templateUrl: "/general-public-expenses-app/views/SOS10.html",
        controller: "Api-sos10"
    }).

    when("/integrations/api-sos06", {
        templateUrl: "/general-public-expenses-app/views/SOS06.html",
        controller: "Api-sos06"
    }).

    when("/integrations/api-sos02", {
        templateUrl: "/general-public-expenses-app/views/SOS02.html",
        controller: "Api-sos02"
    }).

    when("/integrations/api-sos", {
            templateUrl: "/general-public-expenses-app/views/SOS.html",
            controller: "Api-sos"
        })
        //------------------------------------------------- analytics TODO EL GRUPO------------------------------------------------ 
        .
    when("/analytics", {
        controller: "AnalyticsCtrl",
        templateUrl: "analytics.html"


    });




});

console.log("App initialized!");
