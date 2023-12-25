import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Components/todoList/TodoList";
import {v1} from "uuid";


// тип фильтрации
export  type FilterTypes = "all" | "completed" | "active"

function App() {


    // создоём стейт который хранит массив из списков
    const [todoLists, setTodoLists] = useState([
        {id: v1(), title: "what to learn", filter: "all", tasks: [
                {id: v1(), title: "js", isDone: false},
                {id: v1(), title: "php", isDone: true},
                {id: v1(), title: "css", isDone: false},]},
        {id: v1(), title: "What to buy", filter: "all", tasks: [{id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Banana", isDone: true},
                {id: v1(), title: "Egg", isDone: false},]},
    ])



    // функция говорит какая кнопка фильтрации была нажата и меняет переменную filter на значение нажатой кнопки фильтрации
    const filterTasks = (todoListID:string,filterValue: FilterTypes) =>{
        let todoList:any = todoLists.find(t => t.id === todoListID )
        if(todoList){
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    // функция удоляет таску при нажатие на кнопку удоления
    let removeTask = (todoListID:string,taskID: string): void => {
        todoLists.forEach(t => {
          if(t.id === todoListID){
              t.tasks  = t.tasks.filter(task => task.id !== taskID)
              setTodoLists([...todoLists])
          }
        })

    }

    // функция добовляет новую таску в список тасок
    const addNewTask = (todoListID:string, newTaskTitle: string): void => {
        todoLists.forEach(t =>{
            if(t.id === todoListID){
                let newTask = {id: v1(), title: newTaskTitle, isDone: false}
                t.tasks.push(newTask)
                setTodoLists([...todoLists])
            }
        })

    }
    // функция меняет статус активности в таске
    const changeStatus = (todoListID:string,taskID: string) => {
        todoLists.forEach(t =>{
            if(t.id === todoListID ){
                t.tasks.forEach(task =>{
                    if(task.id === taskID){
                        task.isDone = !task.isDone
                        setTodoLists([...todoLists])
                    }
                })

            }

        })

    }

    // удоляем Todo list
    const removeTodoList = (todoListID:string)=>{
        const withoutRemoteTodoLists = todoLists.filter(t => t.id!==todoListID)
        setTodoLists([...withoutRemoteTodoLists])
    }

    const addTodoList = ()=>{
        todoLists.push({id: v1(), title: " ", filter: "all", tasks: []})
        let withAddedTodoList = todoLists
        setTodoLists([...withAddedTodoList])
    }

    // возвращаем кампаненту App и в ней списки тасков
    return (
        <div className="App">
            <form>
                <input></input>
                <button type={"button"} onClick={addTodoList}>+</button>
            </form>

            {
                todoLists.map(todoList => {
                    let filteredTodoList = todoList.tasks
                    if (todoList.filter === "active") {
                        filteredTodoList = todoList.tasks.filter(t => !t.isDone)
                    } else if (todoList.filter === "completed") {
                        filteredTodoList = todoList.tasks.filter(t => t.isDone)
                    }

                    return <TodoList
                        key={todoList.id}
                        todoListID={todoList.id}
                        title={todoList.title}
                        tasks={filteredTodoList}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addNewTask={addNewTask}
                        onChangeStatus={changeStatus}
                        removeTodoList={removeTodoList}

                    />
                })

            }


        </div>
    );
}

export default App;
