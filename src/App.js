import './App.css';
import React, { useState, useEffect } from 'react';
import TodoList from './Components/Todolist';
// import UseRef from './useref';

const LOCAL_STORAGE_KEY = 'TODO.ITEMS'

function App() {
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState(()=>{
    const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodo === null){
      return []
    }
    // setTodos(storedTodo)
  })
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storedTodo) {
        console.log('stored todo', storedTodo)
        setTodos(storedTodo);
      }
      setLoading(false);
      console.log('Data succesfully Get from the local storage')

    }
    catch (err) {
      console.log('Data not Retrived', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
      console.log('Data saved to local storage')

    }
    catch (error) {
      console.log('Error during saving data to local storage', error)
    }
  }, [todos])




  const submitHandler = (e) => {
    e.preventDefault()
    if (value.trim() === '') {
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

  const clearCompletedHandler = () => {

    if (todos.length == 0) {
      alert('Please Create some todos First')
    }

    setTodos(currentTodo => {
      return currentTodo.filter(todo => !todo.completed)
      // todo.completed !== true
    })
    // let unChecked = todos.some(todo => todo.completed == false)
    // if (unChecked) {
    //   alert('Please Tick todo to clear')
    // }
  }
  console.log('re rendered')

  console.log(todos)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container'>
      <div className='fixed'>
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

        </div>
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
