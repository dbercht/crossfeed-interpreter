app.controller("CrossFeedController", function($scope) {
  $scope.base = "~fran 7s 21-15-9 95#thrusters #pullups";
  $scope.master = $scope.post;
  
  $scope.post;

  //Updating the  
  $scope.update = function(post) {
    $scope.master = buildPost(post);
  };
 
  $scope.reset = function() {
    $scope.client = angular.copy($scope.post);
  };

  $scope.update($scope.base);
  $scope.reset();
});