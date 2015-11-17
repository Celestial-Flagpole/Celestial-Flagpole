/*
Angular module to define floatie's youtube search functionality. This is where all the methods specific to search are located. Rather than performing actions directly in the contoller, this controller uses both the SearchService and VideoService. 
*/
angular.module('search', ['floatie.services.search'])
.controller('SearchController', function SearchController(SearchService, VideoService) {
  var searchController = this;
  searchController.youtubeResults = [];
  searchController.filesearchResults = [];

  searchController.searchYoutube = function () {
    searchController.showResultsForFile = false;
    SearchService.searchYoutube(searchController.youtubeQuery)
      .then(function(results) {
        searchController.youtubeResults = results;
      });
  };

  searchController.playVideo = function (videoId) {
    searchController.showResultsForFile = false;
    searchController.youtubeQuery = '';
    VideoService.playVideoBySearch(videoId);
  };

  searchController.showResults = function () {
    if (searchController.youtubeQuery === '') {
      return false;
    } else {
      return true;
    }
  };

  searchController.showFile = function(path) {
    VideoService.loadFileBySearch(path);
  };

  searchController.searchFiles = function () {
    SearchService.loadFileBySearch(searchController.filesearchQuery)
      .then(function (results) {
        console.log(results.data);
        console.log('from front-end')
        searchController.filesearchResults = results.data;
        searchController.showResultsForFile = true;
      });
  };

  searchController.showResultsForFile = true;
});
