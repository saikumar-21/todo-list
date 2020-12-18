const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb+srv://Mongodb21:Mongodb@21@list.2lc8y.mongodb.net/todo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 0.0.0.0;

const todoSchema = new mongoose.Schema({
  name: String
});

const todo = mongoose.model('Todo', todoSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  todo.find({}, (err, todoList) => {
    if (err) console.log(err);
    else {
      res.status(200).render('todo.pug', { todoList: todoList });
    }
  })
});

app.post('/', (req, res) => {
  var data = new todo({
    name: req.body.item
  });
  todo.create(data, (err, todo) => {
    if (err) console.log(err);
    else {
      console.log("Inserted Item " + data)
    }
  })
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
