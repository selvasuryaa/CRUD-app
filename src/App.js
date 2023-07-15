import './App.css';
import React, { useState, useRef } from 'react';
// import UseRef from './useref';


function App() {
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    if (value === '') return
    setTodos(currenttodo => {
      return [...currenttodo,
      {
        name: value,
        id: Math.random() * 1000,
        completed: false
      }]
    })
    setValue('')
  }

  const deleteHandler = (id) => {
    setTodos(currentTodo => {
      console.log(currentTodo)
      console.log(todos.id == id)
      return currentTodo.filter(todos => todos.id != id)


    })

  }
  const toggleCheck = (id, completed) => {
    setTodos(currentitem => {
      return currentitem.map(todo => {
        if (todo.id == id) {
          return { ...todo, completed }
        }
        return todo
      })
    })

  }

  return (
    <div className='container'>
      <h1>
        Todo
      </h1>
      <div className='input-todo'>
        <input type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)} />
        <button onClick={submitHandler}>Submit</button>

      </div>
      <p
        style={{
          width: '100px',
          marginLeft: '50px',
          fontWeight: 'bold',
          fontSize: '19px'
        }}>
        {todos.length === 0 && 'No todos  '}

      </p>
      {todos.map(todo => {
        return (
          <div className='list'>
            {/* {console.log(todos)} */}
            <input type='checkbox'
              checked={todo.completed}

              onChange={(e) => toggleCheck(todo.id, e.target.checked)}
            />
            {/* {console.log('www',todos)} */}

            <li key={todo.id}>
              {todo.name.toUpperCase()}
            </li>
            <button onClick={() => deleteHandler(todo.id)}>Delete</button>

          </div>
        )
      })}

      {/* <UseRef/> */}
    </div>
  );
}

export default App;
