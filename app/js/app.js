'use strict';

// Declare app level module which depends on filters, and services
angular.module('krakn', [
                           'ionic',
                           'krakn.config',
                           // 'krakn.routes',
                           'krakn.filters',
                           'krakn.services',
                           'krakn.directives',
                           'krakn.controllers',
                           'simpleLoginTools',
                           'routeSecurity',
                           'ngRoute',
                           'ui.router'
                        ])


   .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $stateProvider, $urlRouterProvider) {

     $stateProvider
       .state('kraknMenu', {
         url: "/krakn",
         abstract: true,
         templateUrl: "partials/menu.html",
         controller: "MenuCtrl"
       })

       .state('kraknMenu.home', {
         url: "/home",
         views: {
           'menuContent' :{
             templateUrl: "partials/home.html",
             controller: "HomeCtrl"
           }
         }
       })

       .state('kraknMenu.chat', {
         url: "/chat",
         views: {
           'menuContent' :{
             templateUrl: "partials/chat.html",
             controller: "ChatCtrl"
           }
         }
       })

       .state('kraknMenu.account', {
         url: "/account",
         views: {
           'menuContent' :{
             authRequired: true, // must authenticate before viewing this page
             templateUrl: "partials/account.html",
             controller: "AccountCtrl"
           }
         }
       })

       .state('kraknMenu.login', {
         url: "/login",
         views: {
           'menuContent' :{
             templateUrl: "partials/login.html",
             controller: "LoginCtrl"
           }
         }
       })
     
     $urlRouterProvider.otherwise("/krakn/home");
   }])


   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
      }
   }]);
