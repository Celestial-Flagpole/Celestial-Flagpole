var express = require('express');

var app = express();

// Connect to mongo database names knowitall
// mongoose.connect('mongodb://localhost/float');
// Confirm connection
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//  console.log('Mongodb connection open');
// });

// Configure our server with all the middleware and routing
//require('./config/middleware.js')(app, express);
app.get('/', function(req, res){
  res.end('hello world');
});

// Set up the port the server should listen to
app.listen(process.env.PORT || 8686);

// Export our app for testing and flexibility
module.exports = app;
