import React from "react"

const TodoItem = ({toggleCheck,deleteHandler,todo}) => {
  return (
    <div>
       <div className='list'>
            <input type='checkbox'
              checked={todo.completed}

              onChange={(e) => toggleCheck(todo.id, e.target.checked)}
            />

            <li key={todo.id}>
              {todo.name.toUpperCase()}
            </li>
            <button onClick={() => deleteHandler(todo.id)}>Delete</button>

          </div>

    </div>
  )
};

export default TodoItem;
