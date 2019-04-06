let fs      = require('fs')
let path    = require('path');
let express = require('express');
let router  = express.Router();

router.get('/', function(req, res, next) {

	let file = '';

	//Get file metadata
	fs.stat(file, function(err, stats) {
		if (err) {
			if(err.code === 'ENOENT') {
				return res.sendStatus(404);
			}
			return next(err)
		}
        //Byterange - afsnit "Early termination & repositioning a video"
        //fx 56321 - 155991132
        let byteRange = req.headers.range;

		if(!byteRange) {
            let err = new Error('Byterange Error');
            //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors
            err.status = 416;
			return next(err);
		}
	});

});

module.exports = router;
