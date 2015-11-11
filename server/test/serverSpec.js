var request = require('supertest');
describe('loading express', function() {
  var server;
  //start and stop the server to make tests order independent
  beforeEach(function (){
    server = require('../app', {bustCache: true});
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /', function defaultRoute (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('404 route not defined', function wrongRoute (done) {
    request(server)
      .get('/wrong/route')
      .expect(404, done);
  });
});