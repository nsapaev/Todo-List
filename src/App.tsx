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

    console.log(todoLists)



    // создаём локальный стейт хранивший изменяемое свойство фильтрации
    let [filter, setFilter] = useState("all ")


    // функция говорит какая кнопка фильтрации была нажата и меняет переменную filter на значение нажатой кнопки фильтрации
    const filterTasks = (todoListID:string,filterValue: FilterTypes) =>{
        todoLists.forEach(t => {
            if(t.id === todoListID){
                t.filter = filterValue
                setTodoLists([...todoLists])
            }
        })
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



    // возвращаем кампаненту App и в ней списки тасков
    return (
        <div className="App">

            {
                todoLists.map(t =>{
                    return <TodoList
                            key={t.id}
                            todoListID={t.id}
                            title={t.title}
                            tasks={t.tasks}
                            removeTask={removeTask}
                            filterTasks={filterTasks}
                            addNewTask={addNewTask}
                            onChangeStatus={changeStatus}
                    />
                })

            }


        </div>
    );
}

export default App;
