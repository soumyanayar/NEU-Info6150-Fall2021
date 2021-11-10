import { useState } from 'react';

function TodoAddForm({ onAdd }) {
  const [ task, setTask ] = useState('');
  return (
    <form
      className="todo__form"
      onSubmit={ (e) => {
        e.preventDefault();
        onAdd(task);
        setTask('');
      }}
    >
      <label>
        <span>Task:</span>
        <input
          className="todo__add-text"
          value={task}
          onInput={ (e) => {
             setTask(e.target.value);
          }}
        />
      </label>
      <button type="submit" disabled={!task} >Add</button>
    </form>
  );
};
export default TodoAddForm;
