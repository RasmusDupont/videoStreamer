const fs = require('fs')
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res, next) {

	console.log("OK /");
	res.sendStatus(200);
});

router.get('/japan-mp4', function(req, res, next) {

	console.log("OK /japan-mp4");

	let file = 'assets/why_is_it_so_easy_to_be_thin_in_japan_1080p.mp4';

	//Get file metadata
	fs.stat(file, function(err, stats) {
		if (err) {
			if(err.code === 'ENOENT') {
				console.log("File false");
				return res.sendStatus(404);
			}
			return next(err)
		} else {
			console.log("File true");
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
	res.sendStatus(200);
});

module.exports = router;