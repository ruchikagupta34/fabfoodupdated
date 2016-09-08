angular.module('myApp').factory('AuthService',['$q', '$timeout', '$http',function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      register: register,
      logout:logout
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function(data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    
    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

     function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);

angular.module('myApp')
  .factory('lunchFactory',['$q','$http', function ($q, $http) {
    return {
      getMongoStuff: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/lunch');
 
        httpPromise.success(function (fooddatas) {
          deferred.resolve(fooddatas);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      } 
    };
  }]);


  angular.module('myApp')
  .factory('breakfastFactory',['$q','$http', function ($q, $http) {
    return {
      getMongoStuff: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/breakfast');
 
        httpPromise.success(function (breakfastdatas) {
          deferred.resolve(breakfastdatas);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      } 
    };
  }]);

  angular.module('myApp')
  .factory('dinnerFactory',['$q','$http', function ($q, $http) {
    return {
      getMongoStuff: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/dinner');
 
        httpPromise.success(function (dinnerdatas) {
          deferred.resolve(dinnerdatas);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      } 
    };
  }]);

  angular.module('myApp')
  .factory('dessertFactory',['$q','$http', function ($q, $http) {
    return {
      getMongoStuff: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/dessert');
 
        httpPromise.success(function (dessertdatas) {
          deferred.resolve(dessertdatas);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      } 
    };
  }]);

  angular.module('myApp')
  .factory('kidsFactory',['$q','$http', function ($q, $http) {
    return {
      getMongoStuff: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/kidsspecial');
 
        httpPromise.success(function (kidsspecials) {
          deferred.resolve(kidsspecials);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      } 
    };
  }]);
