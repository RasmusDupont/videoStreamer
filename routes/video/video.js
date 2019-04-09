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
	fs.stat(file, function(err, fileStatus) {
		if(err) {
			if(err.code === 'ENOENT') {
				console.log("File not found");
				return res.sendStatus(404);
			}
			return next(err)
		}
        //Byterange - afsnit "Early termination & repositioning a video"
        let byteRange = req.headers.range;

		if(!byteRange) {
            let err = new Error('Byterange Error');
            //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors
            err.status = 416;
			return next(err);
		}

		let positions = range.replace(/bytes=/, '').split('-');
		let start = parseInt(positions[0], 10);
		let end = positions[1] ? parseInt(positions[1], 10) : fileStatus.size - 1;
		let streamPosition = {
			start: start,
			end: end
		}
		
		//bits sent back to the browser
		let segment = (end - start) + 1;

		let headers = {
			'Content-Range': 'bytes ' + start + '-' + end + '/' + fileStatus.size,
			'Accept-Ranges': 'bytes',
			'Content-Length': segment,
			'Content-Type': 'video/mp4'
		}

		//HTTP Code 206 Partial content
		res.writeHead(206, headers);

		//create streaming segment according to the client request
		let stream = fs.createReadStream(file, streamPosition);

		stream.on('open', function() {
			stream.pipe(res);
		});

		stream.on('error', function(err) {
			return next(err);
		});
	});
});

module.exports = router;