const express = require('express');
const apiRouter = express.Router();

apiRouter.get("/", function (req, res) {
    res.send("Video Streamer API")
});

module.exports = apiRouter;