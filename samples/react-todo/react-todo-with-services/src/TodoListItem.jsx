function TodoListItem({ todo, onToggle, onDelete }) {
  const textClass = `todo__text ${ todo.done ? 'todo__text--done' : ''}`;
  return (
    <li className="todo">
      <label
        className="todo__label"
      >
        <input
          type="checkbox"
          checked={todo.done}
          onChange={ () => onToggle(todo.id) }
        />
        <span
          className={textClass}
        >
          {todo.task}
        </span>
      </label>
      <button
        type="button"
        className="todo__delete"
        onClick={() => onDelete(todo.id)}
      >&#10060;</button>
    </li>
  );
};
export default TodoListItem;
