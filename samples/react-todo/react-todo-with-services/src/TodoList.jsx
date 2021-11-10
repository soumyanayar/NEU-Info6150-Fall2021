import TodoListItem from './TodoListItem';
import TodoAddForm from './TodoAddForm';

function TodoList({ todos, onAdd, onDelete, onToggle }) {
  return (
    <div className="todo-list__container">
      <ul className="todo-list">
        {
          Object.values(todos).map( todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ) )
        }
      </ul>
      <TodoAddForm onAdd={onAdd}/>
    </div>
  );
}
export default TodoList;
