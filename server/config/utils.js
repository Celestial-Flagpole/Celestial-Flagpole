module.exports = {
  // log the error then send it to the next middleware in
  // middleware.js
  errorLogger: function (error, req, res, next) {
    console.error(error.stack);
    next(error);
  },

  // send error message to client
  // message for gracefull error handling on app
  errorHandler: function (error, req, res, next) {
    res.send(500, {error: error.message});
  }
};
