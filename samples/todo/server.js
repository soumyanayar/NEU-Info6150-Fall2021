const express = require('express');
// const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// const sessions = require('./sessions');
const todos = require('./todos');

app.use(express.static('./public'));
app.use(express.json());

// app.get('/api/session', (req, res) => {

// });

app.get('/api/todos', (req, res) => {
  res.json(todos.getList());
});

app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const id = todos.addTodo(task);
  res.json({id});
});

// app.use('/api/todos', (req, res) => {
//   res.header('Allow', 'GET, POST');
//   res.status(405).json({ error: `invalidMethod`, message: `${req.method} is not supported on ${req.path}`});
// });

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

// app.use('/api/todos/:id', (req, res) => {
//   res.header('Allow', 'GET, POST, PUT, PATCH, DELETE');
//   res.status(405).json({ error: `invalidMethod`, message: `${req.method} is not supported on ${req.path}`});
// });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

