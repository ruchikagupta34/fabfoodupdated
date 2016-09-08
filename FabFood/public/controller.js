// angular.module('myApp').controller('LoginCtrl',['$scope', '$location', 'AuthService',
//   function ($scope, $location, AuthService) {

//     $scope.login = function () {

//       // initial values
//       $scope.error = false;
//       $scope.disabled = true;

//       // call login from service
//       AuthService.login($scope.loginForm.username, $scope.loginForm.password)
//         // handle success
//         .then(function () {
//           $location.path('/home');
//           $scope.disabled = false;
//           $scope.loginForm = {};
//         })
//         // handle error
//         .catch(function () {
//           $scope.error = true;
//           $scope.errorMessage = "Invalid username and/or password";
//           $scope.disabled = false;
//           $scope.loginForm = {};
//         });

//     };

// }]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/home');
            

        });

    };

}]);



// angular.module('myApp').controller('RegisterCtrl',['$scope', '$location', 'AuthService',
//   function($scope, $location, AuthService) {

//     $scope.register = function () {

//       // initial values
//       $scope.error = false;
//       $scope.disabled = true;
//       console.log($scope.error);

//       // call register from service
//       AuthService.register($scope.registerForm.username, $scope.registerForm.password)
//         // handle success
//         .then(function () {
//           $location.path('/login');
//           $scope.disabled = false;
//           $scope.registerForm = {};
//         })
//         // handle error
//         .catch(function () {
//           $scope.error = true;
//           $scope.errorMessage = "Something went wrong!";
//           $scope.disabled = false;
//           $scope.registerForm = {};
//         });
//     };
// }]);


angular.module('myApp').controller('fab-data-lunch',['lunchFactory','$scope', function(lunchFactory,$scope){
            
        lunchFactory.getMongoStuff()
        .then(function(fooddatas) {
           $scope.dishoption=fooddatas;
           console.log($scope.dishoption);
           $scope.FabFood = fooddatas[0].dishlist;
           console.log($scope.FabFood);
        }, 
        function (error) {
            console.log(error);
          });
            $scope.propertyName = 'price';
            $scope.reverse = true;
            $scope.FabFood=$scope.FabFood;

              $scope.sortBy = function(propertyName) {
              $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
              };
     
         }]); 
angular.module('myApp').controller('fab-data-kidsspecial',['kidsFactory','$scope', function(kidsFactory,$scope){
            
        kidsFactory.getMongoStuff()
        .then(function(kidsspecials) {
           $scope.dishoption=kidsspecials;
           console.log($scope.dishoption);
           $scope.FabFood = kidsspecials;
           console.log($scope.FabFood);
        }, 
        function (error) {
            console.log(error);
          });
            $scope.propertyName = 'price';
            $scope.reverse = true;
            $scope.FabFood=$scope.FabFood;

              $scope.sortBy = function(propertyName) {
              $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
              };
     
         }]); 




angular.module('myApp').controller('fab-data-dinner',['dinnerFactory','$scope', function(dinnerFactory,$scope){
            
        dinnerFactory.getMongoStuff()
        .then(function(dinnerdatas) {
          $scope.dishoption=dinnerdatas;
        $scope.FabFood = dinnerdatas[0].dishlist;
         console.log($scope.FabFood);
        }, 
        function (error) {
            console.log(error);
          });
            $scope.propertyName = 'price';
            $scope.reverse = true;
            $scope.FabFood=$scope.FabFood;

              $scope.sortBy = function(propertyName) {
              $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
              };
     
         }]); 

  

  
  myApp.controller('fab-data-breakfast',['breakfastFactory','$scope',function(breakfastFactory,$scope){
     breakfastFactory.getMongoStuff()
        .then(function(breakfastdatas) {
           $scope.dishoption=breakfastdatas;
        $scope.FabFood = breakfastdatas[0].dishlist;
         console.log($scope.FabFood);
        }, 
        function (error) {
            console.log(error);

          });
    
     $scope.propertyName = 'rating';
     $scope.reverse = true;
     $scope.FabFood=$scope.FabFood;

     $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
         $scope.propertyName = propertyName;
      };
     
   }]);

  myApp.controller('fab-data-dessert',['dessertFactory','$scope',function(dessertFactory,$scope){
     dessertFactory.getMongoStuff()
        .then(function(dessertdatas) {
           $scope.dishoption=dessertdatas;
        $scope.FabFood = dessertdatas[0].dishlist;
         console.log($scope.FabFood);
        }, 
        function (error) {
            console.log(error);

          });
    
     $scope.propertyName = 'rating';
     $scope.reverse = true;
     $scope.FabFood=$scope.FabFood;

     $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
         $scope.propertyName = propertyName;
      };
     
   }]);



  myApp.controller('dish-data',function($scope,$http,ngCart){
    ngCart.setTaxRate(7.5);
      ngCart.setShipping(2.99);
  });

    
  

  myApp.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
      $scope.gotoBottom = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        $anchorScroll();
      };
    }]);
