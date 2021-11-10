const uuid = require('uuid').v4;

const id1 = uuid();
const id2 = uuid();

const todos = {
  [id1]: {
    id: id1,
    task: 'Nap',
    done: false,
  },
  [id2]: {
    id: id2,
    task: 'Race away for no reason',
    done: true,
  },
};

function contains(id) {
  return !!todos[id];
}

function getList() {
  return {...todos};
}

function addTodo(task) {
  const id = uuid();
  todos[id] = {
    id,
    task,
    done: false,
  };
  return todos[id];
}

function getTodo(id) {
  return todos[id];
}

function updateTodo(id, todo) {
  todos[id].task = todo.task || todos[id].task;
  todos[id].done = todo.done ?? todos[id].done;
}

function deleteTodo(id) {
  delete todos[id];
}

module.exports = {
  getList,
  contains,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
