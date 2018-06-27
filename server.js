const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require(__dirname + '/DB.js');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, function (req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

const server = app.listen(port, () => {
    console.log("Listening on port " + port);
});
