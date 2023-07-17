import React from "react"

const TodoItem = ({ toggleCheck, deleteHandler, todo }) => {
  return (
      <div id='todo-item'>
        <label>
          <input type='checkbox'
            checked={todo.completed}
            onChange={(e) => toggleCheck(todo.id, e.target.checked)}
          />

        <li key={todo.id}>
          {todo.name.toUpperCase()}
        </li>
        </label>

        <button onClick={() => deleteHandler(todo.id)}>Delete</button>

      </div>

  )
};

export default TodoItem;
