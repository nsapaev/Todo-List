import style from "./todoList.module.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, {useState} from "react";
import {FilterTypes} from "../../App";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {TodoListTitle} from "./todoListTitle/TodoListTitle";
import {TodoTasksTitle} from "./todoTasksTitle/TodoTasksTitle";


// тип тасков
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
    editMode:false
}

// тип приходящих пропсов
type PropsType = {
    title: string,
    tasks: any,
    removeTask: (todoListID: string, taskID: string) => void
    filterTasks: (todoListID: string, filterValue: FilterTypes) => void,
    addNewTask: (todoListID: string, taskTitle: string) => void
    onChangeStatus: (todoListsID: string, taskID: string) => void
    todoListID: string
    removeTodoList:(todoListID:string)=>void
    activateEditMode:(todoListID:string)=>void
    editTitleMode:boolean
    deactivateEditMode:(todoListID:string,newTitle:string)=>void
    editModeTaskTitle:boolean
    activateTaskTitleEditMode:(todoTaskID:string) => void
    deActivateTaskTitleEditMode:(todoTaskID:string,newTitle:string)=>void

}


export const TodoList = (props: PropsType) => {

    let [error, setError] = useState(false)
    let [newTaskInputValue, setNewTaskInputValue] = useState("")
    const handlerChangeNewTaskInputValue = (e: any) => {
        setNewTaskInputValue(e.currentTarget.value)
        setError(false)
    }
    const handlerRemoveTask = (todoListID: string, taskID: string) => {
        props.removeTask(todoListID, taskID)
    }
    const handlerFilterTask = (todoListID: string, value: FilterTypes) => {
        setActiveButton(value)
        props.filterTasks(todoListID, value)
    }
    const handlerAddNewTask = (todoListID: string) => {
        if (newTaskInputValue.trim()) {
            props.addNewTask(todoListID, newTaskInputValue.trim())
            setNewTaskInputValue('')
        } else {
            setError(true)
        }
    }
    const handlerKeyPress = (e: any, todoListID: string) => {
        if (newTaskInputValue.trim() && e.charCode == 13) {
            props.addNewTask(todoListID, newTaskInputValue.trim())
            setNewTaskInputValue('')
        } else {
            setError(true)
        }
    }
    const handlerChangeStatus = (todoListID: string, taskID: string) => {
        props.onChangeStatus(todoListID, taskID)
    }
    const handlerRemoveTodoList =(todoListID:string)=>{
        props.removeTodoList(todoListID)
    }


    const handlerActivateEditMode = (todoListID:string) =>{
        props.activateEditMode(todoListID)
    }


    let [titleInputValue, setTitleInputValue] = useState(props.title)
    const handlerChangeTitleInputValue= (e:any) =>{
        setTitleInputValue(e.currentTarget.value)
    }
    const deactivateEditMode = (todoListID:string) =>{
        if(titleInputValue.trim()) props.deactivateEditMode(todoListID,titleInputValue.trim())

    }

    let [activeButton, setActiveButton] = useState("all")

    return (
        <div className={style.todoList}>

                    <TodoListTitle
                        editModeTaskTitle={props.editModeTaskTitle}
                        editTitleMode={props.editTitleMode}
                        handlerActivateEditMode={handlerActivateEditMode}
                        titleInputValue={titleInputValue}
                        handlerChangeTitleInputValue={handlerChangeTitleInputValue}
                        deactivateEditMode={deactivateEditMode}
                        title={props.title}
                        todoListID={props.todoListID}
                        handlerRemoveTodoList={handlerRemoveTodoList}
                    />

            <div className={style.todoList__container}>
                <div className={style.listInput}>
                    <div className={error ? style.todoList__inputTitle : ""}>
                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   value={newTaskInputValue}
                                   onKeyPress={(e) => {
                                       handlerKeyPress(e, props.todoListID)
                                   }}
                                   onChange={handlerChangeNewTaskInputValue}/>
                    </div>
                    <Button variant="contained" size="small" onClick={() => {
                        handlerAddNewTask(props.todoListID)
                    }}>+</Button>
                    {error ? <h5 className={style.errorMessage}>Field is Required</h5> : null}
                </div>
                <ul className={style.checkboxItems}>
                    <TodoTasksTitle
                        tasks={props.tasks}
                        handlerRemoveTask={handlerRemoveTask}
                        handlerChangeStatus={handlerChangeStatus}
                        todoListID={props.todoListID}
                        activateTaskTitleEditMode={props.activateTaskTitleEditMode}
                        deActivateTaskTitleEditMode={props.deActivateTaskTitleEditMode}
                        editMode={props.editModeTaskTitle}
                    />
                </ul>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button className={"btn"} color={activeButton === "all"?"secondary":"primary"} onClick={() => {
                        handlerFilterTask(props.todoListID, "all")
                    }}>All</Button>
                    <Button color={activeButton === "active"?"secondary":"primary"}  onClick={() => {
                        handlerFilterTask(props.todoListID, "active")
                    }}>Active</Button>
                    <Button color={activeButton === "completed"?"secondary":"primary"} onClick={() => {
                        handlerFilterTask(props.todoListID, "completed")
                    }}>Completed </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}