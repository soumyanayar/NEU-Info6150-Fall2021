const express = require('express');
const cors = require('cors');
const todos = require('./todos');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`
    You are looking at the wrong webserver url.
    This is the server running the services,
    not the server hosting your SPA.
  `);
});

app.get('/api/todos', (req, res) => {
  res.json(todos.getList());
});

app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const todo  = todos.addTodo(task);
  res.json(todo);
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  if(!todos.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todos.getTodo(id));
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, done } = req.body;
  if(!todos.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todos.updateTodo(id, { task, done });
  res.json(todos.getTodo(id));
});

app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, done } = req.body;
  if(!todos.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todos.updateTodo(id, { task, done });
  res.json(todos.getTodo(id));
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const exists = todos.contains(id);
  if(exists) {
    todos.deleteTodo(id);
  }
  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});

app.listen(PORT, () => console.log(`
  Service server started
    Note: This only provides RESTful services
    You must run a separate front end webserver to call these services

  The below url will be used by the service calls
  This is not where your webpages will show

  http://localhost:${PORT}
`));

