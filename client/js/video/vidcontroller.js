angular.module('video', [])
.controller('VideoController', function VideoController($scope, VideoService) {
  $scope.videoService = VideoService;
  $scope.text = VideoService.text;

  //$scope.addListener = function () {
    $scope.$watch('VideoService.text', function(text, oldText, scope){
      if(text) {
        console.log('changed');
        $scope.text = text;
      }
    });
  //};

  //$scope.addListener();
  
});
