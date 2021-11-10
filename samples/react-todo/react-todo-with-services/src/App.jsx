import { useState, useEffect } from 'react';

import TodoList from './TodoList';
import './app.css';

import {
  fetchTodos,
  fetchUpdateTodo,
  fetchDeleteTodo,
  fetchAddTodo
} from './services';


// Error handling and spinners have been omitted for clarity of service code


function App() {
  const [todos, setTodos] = useState({});

  useEffect(
    () => {
      fetchTodos()
      .then( result => setTodos(result) )
      .catch( err => console.log('poop', err) );
    },
    [ setTodos ]
  );


  function onToggle(id) {
    fetchUpdateTodo( id, { done: !todos[id].done })
    .then( todo => {
      setTodos( {
        ...todos,
        [id]: todo,
      });
    })
    .catch( err => console.log('poop', err) );
  }

  function onAdd(task) {
    fetchAddTodo(task)
    .then( todo => {
      setTodos({
        ...todos,
        [todo.id]: todo,
      })
    })
    .catch( err => console.log('poop', err) );
  }

  function onDelete(id) {
    fetchDeleteTodo(id)
    .then( () => {
      const newList = { ...todos};
      delete newList[id];
      setTodos(newList);
    })
    .catch( err => console.log('poop', err) );
  }

  return (
    <div className="app">
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </div>
  );
}

export default App;
