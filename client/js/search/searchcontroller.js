/*
Angular module to define floatie's youtube search functionality. This is where all the methods specific to search are located. Rather than performing actions directly in the contoller, this controller uses both the SearchService and VideoService. 
*/
angular.module('search', ['floatie.services.search'])
.controller('SearchController', function SearchController(SearchService) {
  var searchController = this;
  searchController.youtubeResults = [];

  searchController.searchYoutube = function () {
    SearchService.searchYoutube(searchController.youtubeQuery)
      .then(function(results) {
        searchController.youtubeResults = results;
              console.log(searchController.youtubeResults[0])
      });
  }

  searchController.searchFiles = function () {
    VideoService.searchFiles(fileQuery)
      .then(function(results) {
        searchController.data.filesearchResults = results;
      });
  }
  
});
