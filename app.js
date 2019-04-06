let path = require('path');
let logger = require('morgan');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//API Routes
app.use('/', require('./routes/index'));
app.use('/video', require('./routes/video'));
//Catch invalid route
app.use(function(req, res, next) {
  let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//Log error during requests
app.use(function(err, req, res, next) {
	let obj_message = {
		message: err.message
	};

	if(process.env.NODE_ENV == 'development')
	{
		obj_message.error = err;
		console.error(err);
	}

	res.status(err.status || 500);
	res.json(obj_message);
});
module.exports = app;
