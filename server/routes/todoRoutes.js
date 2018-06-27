const express = require('express');
const app = express();
const todoRoutes = express.Router();

const mongoose = require('mongoose');

var ToDo = require('../models/todo');

todoRoutes.route('/add').post(function (req, res) {
    req.body._id = mongoose.Types.ObjectId().toString();
    const todo = new ToDo(req.body);
    todo.save().then(todo => {
        console.log(200, req.baseUrl);
        res.status(200).json({
            'todo': 'todo added successfully',
            'newid': req.body._id
        });
    })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

todoRoutes.route('/').get(function (req, res) {
    ToDo.find(function (err, todos) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(200, req.originalUrl);
            res.json(todos);
        }
    });
});

todoRoutes.route('/update/:id').post(function (req, res) {
    ToDo.findById(req.params.id, function (err, todo) {
        if (!todo)
            return next(new Error('Could not load Document'));
        else {
            todo.text = req.body.text;

            todo.save().then(todo => {
                console.log(200, req.originalUrl);
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

todoRoutes.route('/del/:id').get(function (req, res) {
    ToDo.findByIdAndRemove({ _id: req.params.id }, function (err, todo) {
        if (err) res.json(err);
        else {
            console.log(200, req.originalUrl)
            res.json('Successfully removed');
        }
    })
})


module.exports = todoRoutes;