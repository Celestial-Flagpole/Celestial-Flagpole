var expect = require('chai').expect;
var request = require('supertest');
//nock is an HTTP mocking
var nock = require('nock');

describe('loading express', function() {
  var server;
  //start and stop the server to make tests order independent
  beforeEach(function (done){
    server = require('./server', {bustCache: true});
    //make sure app is listening
    server.listen(8686, function(err, result){
      if(err){
        done(err);
      }else{
        done();
      }
    });
  });

  afterEach(function (done) {
    server.close(done);
  });

  //requests to server
  describe('basic requests', function () {
    //test to check if our server responds to this request
    it('responds to /', function defaultRoute (done) {
      request(server)
        .get('/')
        .expect(200, done);
    });
    //should throw a 404 when users make a request to unknown route
    it('404 route not defined', function wrongRoute (done) {
      request(server)
        .get('/wrong/route')
        .expect(404, done);
    });
  });

  //request to third party 
  describe('youtube get', function() {
   var youtube = nock('youtubeURL')
    .get('/video/endpoint')
    .reply(200, {
      data: {
        id: "videoid",
        name: "videoName",
      }
    });
  });

});