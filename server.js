require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require(__dirname + '/server/config/db.js');
const todoRoutes = require(__dirname + '/server/routes/todoRoutes.js');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, config.options).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

app.use(bodyParser.json());
app.use(cors());

app.use('/todos', todoRoutes);

app.get(/.*/, function (req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

const server = app.listen(port, () => {
    console.log("Listening on port " + port);
});
