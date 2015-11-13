angular.module('floatie', [
  'ui.router',
  'video',
  'search',
  'floatie.services.video',
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
      templateUrl: 'video/vidview.html',
      controller: 'VideoController',
      controllerAs: 'video'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search/searchview.html',
      controller: 'SearchController',
      controllerAs: 'search'
    })

    $urlRouterProvider.otherwise('/');
});
