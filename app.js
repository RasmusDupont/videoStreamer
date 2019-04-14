const express = require('express');
const path = require('path');
const logger = require('morgan');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json('notFound');
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;