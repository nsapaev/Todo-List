import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Components/todoList/TodoList";
import {v1} from "uuid";
import {AddNewTodoListForm} from "./Components/addNewTodoListForm/AddNewTodoListForm";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import AppBar from "./Components/appBar/AppBar";


// тип фильтрации
export  type FilterTypes = "all" | "completed" | "active"

function App() {


    // создоём стейт который хранит массив из списков
    const [todoLists, setTodoLists] = useState([
        {id: v1(), title: "what to learn", editTitleMode:false, filter: "all", tasks: [
                {id: v1(), title: "js",  isDone: false, editMode:false},]},
        {id: v1(), title: "What to buy", editTitleMode:false,  filter: "all", tasks: [{id: v1(), title: "Milk", isDone: false,editMode:false},
                {id: v1(), title: "Banana",  isDone: true, editMode:false},
                ]},
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
                let newTask = {id: v1(), title: newTaskTitle, isDone: false,editMode:false}
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
    const addTodoList = (title:string)=>{
        todoLists.push({id: v1(), title: title, editTitleMode:false, filter: "all", tasks: []})
        setTodoLists([...todoLists])
    }
    let [editMode, setEditMode] = useState(false)
    const activateEditMode = (todoListID:string) =>{
        todoLists.forEach(t =>{
            if(t.id === todoListID){
                t.editTitleMode = true
                setTodoLists([...todoLists])
            }
        })
    }
    const deactivateEditMode = (todoListID:string, newTitle:string):void=>{
        todoLists.forEach(t =>{
            if(t.id === todoListID){
                t.editTitleMode = false
                t.title = newTitle
                setTodoLists([...todoLists])
            }
        })
    }

    let [editModeTaskTitle, setEditModeTaskTitle] = useState(false)
    const activateTaskTitleEditMode = (taskTitleID:string) =>{
        todoLists.forEach(list => {
            list.tasks.forEach(t =>{
                if(t.id == taskTitleID){
                    t.editMode = true
                    setTodoLists([...todoLists])
                }
            })
        })
    }
    const deActivateTaskTitleEditMode = (taskTitleID:string,newTitle:string) =>{
        todoLists.forEach(list => {
            list.tasks.forEach(t =>{
                if(t.id == taskTitleID){
                    t.editMode = false
                    t.title = newTitle
                    setTodoLists([...todoLists])
                }
            })
        })
    }

    // возвращаем кампаненту App и в ней списки тасков
    return (
        <div className="App">
            <AppBar/>
            <Container maxWidth="lg">
            <AddNewTodoListForm addTodoList={addTodoList}/>

            <Grid container spacing={2}  direction="row"  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    {
                        todoLists.map(todoList => {
                            let filteredTodoList = todoList.tasks
                            if (todoList.filter === "active") {
                                filteredTodoList = todoList.tasks.filter(t => !t.isDone)
                            } else if (todoList.filter === "completed") {
                                filteredTodoList = todoList.tasks.filter(t => t.isDone)
                            }

                            return  <Grid item xs={4}>
                                <Card variant="outlined">
                                    <TodoList
                                        key={todoList.id}
                                        todoListID={todoList.id}
                                        title={todoList.title}
                                        tasks={filteredTodoList}
                                        removeTask={removeTask}
                                        filterTasks={filterTasks}
                                        addNewTask={addNewTask}
                                        onChangeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        activateEditMode={activateEditMode}
                                        editTitleMode={todoList.editTitleMode}
                                        deactivateEditMode={deactivateEditMode}
                                        editModeTaskTitle={editModeTaskTitle}
                                        activateTaskTitleEditMode={activateTaskTitleEditMode}
                                        deActivateTaskTitleEditMode={deActivateTaskTitleEditMode}
                                    />
                                </Card>

                            </Grid>
                        })
                    }


            </Grid>

            </Container>


        </div>
    );
}

export default App;
