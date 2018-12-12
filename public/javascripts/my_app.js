angular.module('myApp', []).
controller('myController', ['$scope', '$http',
  function($scope, $http) {

    alert(document.getElementById('user').value);

    $http.get('/user/profile')
      .success(function(data, status, headers, config) {
        $scope.user = data;
        $scope.error = "";
      }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });

    $scope.sendNewHighScore = function(score) {
      var data = { highscore: score};
      $http.post('/updateHighscore', data).success(function(data) {
        console.log("Successfully updated highscore");
      });
    };
    
    
  }
]);
