var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for todo
var ToDo = new Schema({
  _id: {
    type: String
  },
  text: {
    type: String
  },
  importance: {
    type: String
  }
},{
    collection: 'todo_datas'
});

module.exports = mongoose.model('ToDo', ToDo);