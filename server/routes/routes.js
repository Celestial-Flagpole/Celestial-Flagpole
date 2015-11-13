var controller = require('../controllers/videoController.js');

module.exports = function (app) {
  app.get('/', controller.readDir);
};
