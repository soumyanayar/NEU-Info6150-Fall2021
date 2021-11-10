import { useState } from 'react';

function TodoAddForm({ onAdd }) {
  const [ task, setTask ] = useState('');
  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        onAdd(task);
        setTask('');
      }}
    >
      <input
        value={task}
        onInput={ (e) => {
           setTask(e.target.value);
        }}
      />
        <button type="submit" >Add</button>
    </form>
  );
};
export default TodoAddForm;
