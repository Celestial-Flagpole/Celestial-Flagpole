/*
This module defines our main floatie app. Important things to note are: 
1) The use of ui-router to manage state
2) The ROOT has 2 views: youtube search and file search
3) We built out a Service for search (floatie.services.search) and video (floatie.services.video) where common methods that we plan to use across the application lie.
*/

angular.module('floatie', [
  'ui.router',
  'video',
  'youtubeApp',
  'floatie.services.video',
  'search',
  'floatie.services.search',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('floatie', {
      url: '',
      abstract: true
    })
    .state('video', {
      url: '/',
      views: {
        'search@': {
          templateUrl: 'client/js/search/searchview.html',
          controller: 'SearchController',
          controllerAs: 'searchController'
        },
        'video@': {
          templateUrl: 'client/js/video/vidview.html',
          controller: 'VideoController',
          controllerAs: 'videoController'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
});
