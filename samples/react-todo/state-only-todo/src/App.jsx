import { useState } from 'react';
import TodoList from './TodoList';
import './app.css';

const defaultTodos =  {
  1: {
    id: '1',
    task: 'Pounce',
    done: false,
  },
  2: {
    id: '2',
    task: 'Nap',
    done: true,
  }
};

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [lastId, setLastId] = useState(Object.keys(defaultTodos).length);

  function onToggle(id) {
    setTodos( prevTodos => ( {
      ...prevTodos,
      [id]: {
        ...prevTodos[id],
        done: !prevTodos[id].done,
      }
    }));
  }

  function onAdd(task) {
    const id = lastId+1;
    setLastId(id);
    setTodos( prevTodos => ({
      ...prevTodos,
      [id]: {
        id,
        task,
        done: false,
      }
    }));
  }

  function onDelete(id) {
    const newList = { ...todos};
    delete newList[id];
    setTodos(newList);
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
