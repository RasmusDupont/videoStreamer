const express = require('express');
const apiRouter = express.Router();

const videoRouter = require('./video/video.js');

apiRouter.get("/", function (req, res) {
    res.send("Video Streamer API")
});

apiRouter.use('/video', videoRouter);

module.exports = apiRouter;