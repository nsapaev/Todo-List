import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import {TasksType, TodoList} from "./Components/todoList/TodoList";

let task:Array<TasksType> = [
    {id:1, title:"js", isDone: false},
    {id:2, title:"php", isDone: true},
    {id:3, title:"css", isDone: false}
]

let task2:Array<TasksType> = [
    {id:1, title:"html", isDone: true},
    {id:1, title:"git", isDone: true},
    {id:1, title:"web socket", isDone: true}
]

function App() {
  return (
    <div className="App">
       <TodoList title={"list 1"} tasks={task}/>
       <TodoList title={"list 2"} tasks={task2}/>

    </div>
  );
}

export default App;
