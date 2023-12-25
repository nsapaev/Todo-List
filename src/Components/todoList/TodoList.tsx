import style from "./todoList.module.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, {useState} from "react";
import {FilterTypes} from "../../App";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


// тип тасков
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

// тип приходящих пропсов
type PropsType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (todoListID: string, taskID: string) => void
    filterTasks: (todoListID: string, filterValue: FilterTypes) => void,
    addNewTask: (todoListID: string, taskTitle: string) => void
    onChangeStatus: (todoListsID: string, taskID: string) => void
    todoListID: string
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


    return (
        <div className={style.todoList}>
            <h1 className={style.todoList__title}>{props.title}</h1>
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
                    {
                        props.tasks.map(t => {
                            return (
                                <>
                                    <li key={t.id}>
                                        <Checkbox checked={t.isDone} onChange={() => {
                                            handlerChangeStatus(props.todoListID, t.id)
                                        }}/><label>{t.title}</label>
                                        <IconButton onClick={() => {
                                            handlerRemoveTask(props.todoListID, t.id)
                                        }} aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </li>

                                </>
                            )
                        })
                    }

                </ul>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button className={"btn"} onClick={() => {
                        handlerFilterTask(props.todoListID, "all")
                    }}>All</Button>
                    <Button onClick={() => {
                        handlerFilterTask(props.todoListID, "active")
                    }}>Active</Button>
                    <Button onClick={() => {
                        handlerFilterTask(props.todoListID, "completed")
                    }}>Completed </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}