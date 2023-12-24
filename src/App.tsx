import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Components/todoList/TodoList";
import  {v1} from "uuid";

export  type FilterTypes = "all" | "completed" | "active"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "js", isDone: false},
        {id: v1(), title: "php", isDone: true},
        {id: v1(), title: "css", isDone: false},
    ])
    let [filter, setFilter] = useState("all ")
    let deleteTask = (taskID: string): void => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    let onFilterTasks = (filterValue: FilterTypes): void => {
        setFilter(filterValue)
    }

    const addNewTask = (newTaskTitle: string): void => {
        let newTask = {id:  v1(), title: newTaskTitle, isDone: false}
        let newTasksArray: Array<TasksType> = [newTask, ...tasks]
        setTasks(newTasksArray)
    }
    const changeStatus = (taskID:string) =>{
        tasks.forEach(t  => {
            if(t.id === taskID){
                t.isDone = !t.isDone
            }
        })
        setTasks([...tasks])
    }


    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    } else if (filter === "all") {
        filteredTasks = tasks.filter(t => true)
    }


    return (
        <div className="App">
            <TodoList
                title={"list 1"}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                onFilterTasks={onFilterTasks}
                onAddNewTask={addNewTask}
                onChangeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
