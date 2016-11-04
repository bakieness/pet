'use strict';

/* App Module */
var myApp = angular.module('myApp', ['ngRoute', 'controllers', 'firebase'])
.constant('FIREBASE_URL', 'https://ipet.firebaseio.com/');

myApp.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            if (error == 'AUTH_REQUIRED') {
                $rootScope.message = "Sorry, you must login in to access this page";
                $location.path('/login');
            }
        })
}]);

myApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/index', {
              templateUrl: 'views/index.html',
              controller: 'RegistrationCtrl'
          }).
          when('/login', {
              templateUrl: 'views/login.html',
              controller: 'RegistrationCtrl'
          }).
          when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegistrationCtrl'
          }).
          when('/home', {
              templateUrl: 'views/home.html',
              controller: 'PetCtrl',
              resolve: {
                  currentAuth: function (Authentication) {
                      return Authentication.requireAuth();
                  }
              }
          }).
          when('/dates', {
              templateUrl: 'views/dates.html',
              controller: 'ReminderCtrl'
          }).
          when('/addPet', {
              templateUrl: 'views/addPet.html',
              controller: 'PetCtrl'
          }).
          when('/details/:uId/:pId', {
              templateUrl: 'views/petDetails.html',
              controller: 'DetailCtrl'
          }).
          when('/editPet/:pId', {
              templateUrl: 'views/editPet.html',
              controller: 'DetailCtrl'
          }).
          when('/addReminder', {
              templateUrl: 'views/addReminder.html',
              controller: 'ReminderCtrl'
          }).
          when('/editReminder/:pId/:rId', {
              templateUrl: 'views/editReminder.html',
              controller: 'ReminderCtrl'
          }).
          otherwise({
              redirectTo: '/index'
          });
  }]);


//Copyright (c) 2013 Justin Klemm
myApp.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
});
