import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'


function useTodo(){
  const [todos, setTodo] = React.useState([]);
  React.useEffect(() => {
    fetch("https://crispy-system-7x7pq7gpx7gc67q-3000.app.github.dev/todo",{
      method: "GET" 
    }).then((response) =>{
        response.json().then((data)=>{
          // console.log(data);
          setTodo(data);
        })
    })
  })
  return todos;
}


function App() {
  const todos1 = useTodo();
  return (
    <>
      {todos1.map(todo1 =>{
        return <div>
          {todo1.title}
          {todo1.description}
          <button>Delete</button>
        <br />
        </div>
      })}
    </>
  )
};

export default App;
