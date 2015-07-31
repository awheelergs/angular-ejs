'use strict';

var aeApp = angular.module('aeApp', ['ngRoute']);

aeApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })
        .when('/home', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController'
        })
        .when('/soybean', {
            templateUrl : 'pages/soybean.html',
            controller  : 'soybeanController'
        })
        .otherwise({redirectTo: '/'});
});

// *********************************************************************
//
// Directives
//
// *********************************************************************

/* See https://docs.angularjs.org/api/ng/service/$compile
   and http://onehungrymind.com/angularjs-dynamic-templates/ */
aeApp.directive('loginEjs', function ($compile) {
    var ejs = new EJS({url: '/view/login.ejs'});

    var linker = function (scope, element, attrs) {
        var data = {soybean: scope.soybean};
        element.html(ejs.render(data));
        $compile(element.contents())(scope);
    }

    return {
        restrict: "A",
        link: linker
    };
});

// *********************************************************************
//
// Controllers
//
// *********************************************************************

aeApp.controller('homeController', function ($scope) {
    $scope.message = 'Welcome!';
});

aeApp.controller('aboutController', function ($scope) {
    $scope.message = 'About time!';
});

aeApp.controller('contactController', function ($scope) {
    $scope.message = 'Don\'t bother us!';
});

aeApp.controller('loginController', ['$scope', '$http', '$location', 'soybeanModel', function ($scope, $http, $location, soybeanModel) {
    $scope.soybean = soybeanModel.getSoybean();
    $scope.formData = {};

    $scope.onSubmit = function () {
        alert('Fake login successful!');
        $location.url('soybean');
        /*
        $http.post('login', $scope.formData, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (data, status, headers, config) {
                console.log('status: ' + status );
                var hdr = headers();
                for (var key in hdr) {
                    console.log(key + ': ' + hdr[key]);
                }
                console.log(data);
                $location.url(data.redirectTo);
            })
            .error(function (err, status, headers, config) {
                console.log(err);
                $location.url('/login');
            });
        */
    }
}]);

aeApp.controller('soybeanController', ['$scope', 'soybeanModel', function ($scope, soybeanModel) {
    $scope.soybean = soybeanModel.getSoybean();

    $scope.click = function (movie) {
        if (movie.checked) {
        }
    };

}]);

// *********************************************************************
//
// Services
//
// *********************************************************************

aeApp.factory('soybeanModel', function () {
    var soybean = [
        {country: 'United States', mmt: 89, checked: false},
        {country: 'Brazil', mmt: 81, checked: false},
        {country: 'Argentina', mmt: 49, checked: false},
        {country: 'China', mmt: 12, checked: false},
        {country: 'India', mmt: 11, checked: false}
    ];

    return {
        getSoybean: function () {
            return soybean;
        }
    };
});
