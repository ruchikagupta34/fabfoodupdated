var myApp=angular.module('myApp', ['ngCart','ngRoute','ui.bootstrap']);//modules,routing ,deeplinkinking services and directives
    myApp.config(function($routeProvider) {
        $routeProvider //configuring routes
        	 .when('/home', {  //when(path-match routes against $location.path,route)
        		templateUrl : '/dish-type.html',
        		access: {restricted: false}
        	    })

            .when('/lunch', {
                templateUrl : '/dish-list-page-1.html',
                controller  : 'fab-data-lunch',
                access: {restricted: true}
                })

            .when('/dinner', {
                templateUrl : '/dish-list-page-1.html',
                controller  : 'fab-data-dinner',
                access: {restricted: true}
                })

            .when('/dessert', {
                templateUrl : '/dish-list-page-1.html',
                controller  : 'fab-data-dessert',
                access: {restricted: true}
                })

            .when('/kidsspecial', {
                templateUrl : '/dish-list-page-1.html',
                controller  : 'fab-data-kidsspecial',
                access: {restricted: true}
                })

             // .when('/login', {
             //    templateUrl : '/login.html',
             //    controller :   'LoginCtrl',
             //    access: {restricted: false}
             //    })
            
            
            .when('/logout', {
      			controller: 'logoutController',
      			access: {restricted: true}
    			})
           
            // route for the breakfast page
            .when('/breakfast', {
                templateUrl : '/dish-list-page-1.html',
                controller  : 'fab-data-breakfast',
                access: {restricted: true}
                })
            .otherwise({   //when no other route definition is matched
      			redirectTo: '/home',
      
    			});
    });

    
    myApp.controller('modalCtrl',['$scope','$modal',
      function($scope, $modal){
        $scope.showreg=function(){
            $scope.opts={
                templateUrl : 'register.html',
                controller : 'RegisterCtrl'
            };
            var modalInstance = $modal.open($scope.opts);
             modalInstance.result.then(function(){
            })
        }
    }]);

   myApp.controller('RegisterCtrl',['$scope', '$location', '$modal','AuthService',
       function($scope,$location, $modal, AuthService) {
        $scope.register = function () {
        // initial values
          $scope.error = false;
          $scope.disabled = true;
          console.log($scope.error);

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function() {
          $scope.opts={
                templateUrl : 'login.html',
                controller : 'LoginCtrl'
            };
            var modalInstance = $modal.open($scope.opts);
          
           $scope.disabled = false;
          console.log($scope.disabled);
                    
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
}]);


	myApp.run(function($rootScope,$location, $route, AuthService) {
		  $rootScope.$on('$routeChangeStart',
		    function (event, next, current) {
		      AuthService.getUserStatus()
		      .then(function(){
		        if (next.access.restricted && !AuthService.isLoggedIn()){
		           $scope.opts={
                templateUrl : 'login.html',
                controller : 'LoginCtrl'
            };
            var modalInstance = $modal.open($scope.opts);
		          // $route.reload(); //reload the current route even when $location not changed
		        }
		      });
		  });
		});
	
	
     myApp.controller('modalLoginCtrl',['$scope','$modal',function($scope,$modal){
        $scope.showlogin=function(){
            // $scope.opts={
            //     templateUrl : 'login.html',
            //     controller : 'LoginCtrl',
            // };
            var modalInstance = $modal.open({templateUrl : 'login.html',
                controller : 'LoginCtrl',
              });
             modalInstance.result.then(function() {
                   console.log();
    });
        }
    }]);

    //  myApp.service('closemodal',function(){
    //   var modalInstance;
    // return{
    //      showlogin : function(){
    //         // var opts={
    //         //     templateUrl : 'login.html',
    //         //     controller : 'LoginCtrl'
    //         // };
    //         // var modalInstance = $modal.open(opts);
    //          modalInstance = $modal.open({templateUrl : 'login.html',
    //             controller : 'LoginCtrl',
    //             resolve: {
    //               '$modalInstance': function () { return function () { return modalInstance; } }
    //             }
    //             });
    //     },
    //     otherFunction : function() {
    //      modalInstance.close();
    //     }
    //   }
    //  })
      
	myApp.controller('LoginCtrl',['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function() {
 
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function() {
        $scope.disabled = false;
           $scope.loginForm = {};
          $('#modal').modal('hide');
          $location.path('/breakfast');
          console.log($scope.disabled);
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}]);



//
//   function onSignIn(googleUser) {
// 	  var profile = googleUser.getBasicProfile();
// 	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// 	  console.log('Name: ' + profile.getName());
// 	  console.log('Image URL: ' + profile.getImageUrl());
// 	  console.log('Email: ' + profile.getEmail());
// }




	