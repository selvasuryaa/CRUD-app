import './App.css';
import React, { useState, useEffect } from 'react';
import TodoList from './Todolist';
// import UseRef from './useref';

const LOCAL_STORAGE_KEY = 'TODO.ITEMS'

function App() {
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

  }, [todos])

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodo) {

      setTodos(storedTodo);
    }
  }, [])



  const submitHandler = (e) => {
    e.preventDefault()
    if (value === '') {
      alert('Input should not be Empy')
      return
    }
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


  // findForChecked(todos)
  // const findForChecked=(arr)=>{
  //   return arr.some(todo=> todo.completed == false)
  // }
  const clearCompletedHandler = () => {

    if (todos.length == 0) {
      alert('Please Create some todos First')
    }
    // todos.map(todo => {
    //   if (todo.completed == false) {
    //     return alert('Check any of the todo to clear')

    //   }
    // })    
    setTodos(currentTodo => {
      return currentTodo.filter(todo => !todo.completed)
      // todo.completed !== true
    })
    // let unChecked = todos.some(todo => todo.completed == false)
    // if (unChecked) {
    //   alert('Please Tick todo to clear')
    // }
  }


  return (
    <div className='container'>
      <h1>
        Todo
      </h1>
      <div className='input-todo'>
        <input type='text'
          className='inupt-ps'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Enter Todo Here...' />
        <button onClick={submitHandler}>Submit</button>
        <button className='clear' onClick={clearCompletedHandler}>Clear Completed Todos</button>

      </div>
      <p
        style={{
          width: '100px',
          marginLeft: '50px',
          fontWeight: 'bold',
          fontSize: '19px'
        }}>

      </p>
      <TodoList
        todos={todos}
        toggleCheck={toggleCheck}
        deleteHandler={deleteHandler}
      />


    </div>
  );
}

export default App;
