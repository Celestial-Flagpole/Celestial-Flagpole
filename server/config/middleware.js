var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser'); // TODO: Confirm the use of raw body parser: https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
// var helpers = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
// Create routers
  var generalRouter = express.Router();
  // var questionRouter = express.Router(); // use for any other routers 

  // Logger
  app.use(morgan('dev'));
  // Parse incoming raw data
  app.use(bodyParser.raw({limit: '200000kb', type: 'video/mp4'});
  // Parse forms (signup/login)
  app.use(bodyParser.urlencoded({extended: true}));
  // Parse JSON (uniform resource locators)
  app.use(bodyParser.json());
  // Serve static files
  app.use(express.static(__dirname + '/../../client')); // TODO: update


  app.use('/api/float', generalRouter); // use tag router for all tag requests

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../routes/routes.js')(generalRouter);
};
