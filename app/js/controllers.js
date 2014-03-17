'use strict';

/* Controllers */

angular.module('krakn.controllers', [
                                       'ionic'
                                    ])

   // defined in index.html
   .controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
     $scope.leftButtons = [{
       type: 'button-icon button-clear ion-navicon',
       tap: function(e) {
         $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
       }
     }];
   })


   .controller("MenuCtrl", function($scope) {
     $scope.toggleMenu = function() {
       $scope.sideMenuController.toggleLeft();
     };
   })


   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])


  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({
                                    'text': $scope.newMessage,
                                    'user': $scope.user
                                });
            $scope.newMessage = null;
         }
      };
   }])


   .controller('LoginCtrl', ['$scope', 'loginService', '$location',
      function($scope, loginService, $location) {
         $scope.data = {
            "email"        : null,
            "pass"         : null,
            "confirm"      : null,
            "createMode"   : false
         }

         $scope.login = function(cb) {
            $scope.err = null;
            if( !$scope.data.email ) {
               $scope.err = 'Please enter an email address';
            }
            else if( !$scope.data.pass ) {
               $scope.err = 'Please enter a password';
            }
            else {
               loginService.login($scope.data.email, $scope.data.pass, function(err, user) {
                  $scope.err = err? err + '' : null;
                  if( !err ) {
                     cb && cb(user);
                     $location.path('krakn/chat');
                  }
               });
            }
         };


         // $scope.email = null;
         // $scope.pass = null;
         // $scope.data.confirm = null;
         // $scope.createMode = false;

         // $scope.login = function(cb) {
         //    $scope.err = null;
         //    if( !$scope.email ) {
         //       $scope.err = 'Please enter an email address';
         //    }
         //    else if( !$scope.pass ) {
         //       $scope.err = 'Please enter a password';
         //    }
         //    else {
         //       loginService.login($scope.email, $scope.pass, function(err, user) {
         //          $scope.err = err? err + '' : null;
         //          if( !err ) {
         //             cb && cb(user);
         //          }
         //       });
         //    }
         // };

         $scope.createAccount = function() {
            $scope.err = null;
            if( assertValidLoginAttempt() ) {
               loginService.createAccount($scope.data.email, $scope.data.pass,
                  function(err, user) {
                     if( err ) {
                        $scope.err = err? err + '' : null;
                     }
                     else {
                        // must be logged in before I can write to my profile
                        $scope.login(function() {
                           loginService.createProfile(user.uid, user.email);
                           $location.path('krakn/account');
                        });
                     }
                  });
            }
         };

         function assertValidLoginAttempt() {
            if( !$scope.data.email ) {
               $scope.err = 'Please enter an email address';
            }
            else if( !$scope.data.pass ) {
               $scope.err = 'Please enter a password';
            }
            else if( $scope.data.pass !== $scope.data.confirm ) {
               $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
         }
      }])


   .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
      $scope.syncAccount = function() {
         $scope.user = {};
         syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
            $scope.unBindAccount = unBind;
         });
      };
      // set initial binding
      $scope.syncAccount();

      $scope.logout = function() {
         loginService.logout();
         $location.path('krakn/login');
      };

      $scope.data = {
         "oldpass"     : null,
         "newpass"     : null,
         "confirm"     : null
      }

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
         $scope.emailerr = null;
         $scope.emailmsg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      $scope.updateEmail = function() {
        $scope.reset();
        // disable bind to prevent junk data being left in firebase
        $scope.unBindAccount();
        changeEmailService(buildEmailParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.data.oldpass,
            newpass: $scope.data.newpass,
            confirm: $scope.data.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.data.oldpass = null;
                  $scope.data.newpass = null;
                  $scope.data.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         };
      }
      function buildEmailParms() {
         return {
            newEmail: $scope.newemail,
            pass: $scope.pass,
            callback: function(err) {
               if( err ) {
                  $scope.emailerr = err;
                  // reinstate binding
                  $scope.syncAccount();
               }
               else {
                  // reinstate binding
                  $scope.syncAccount();
                  $scope.newemail = null;
                  $scope.pass = null;
                  $scope.emailmsg = 'Email updated!';
               }
            }
         };
      }

   }]);