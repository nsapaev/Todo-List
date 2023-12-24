import style from "./todoList.module.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, {useState} from "react";
import {FilterTypes} from "../../App";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TasksType>,
    deleteTask:(taskID:string) => void,
    onFilterTasks:(filterValue:FilterTypes)=>void,
    onAddNewTask:(taskTitle:string)=>void
    onChangeStatus: (taskID:string)=>void
}


export const TodoList = (props:PropsType) => {
    let [error,setError] = useState(false)
    let [newTaskInputValue,setNewTaskInputValue] = useState("")
    const onChangeNewTaskInputValue =(e:any)=>{
        setNewTaskInputValue(e.currentTarget.value)
        setError(false)
    }
    const onRemoveTask = (taskID:string) =>{
        props.deleteTask(taskID)
    }
    const onFilterTask =(value:FilterTypes)=>{
        props.onFilterTasks(value)
    }
    const onAddNewTask = ()=>{
        if(newTaskInputValue.trim()) {
            props.onAddNewTask(newTaskInputValue)
            setNewTaskInputValue('')
        }else{
            setError(true)
        }
    }
    const handleKeyPress = (e:any) => {
        if (newTaskInputValue.trim() && e.charCode == 13) {
            props.onAddNewTask(newTaskInputValue.trim())
            setNewTaskInputValue('')
        }else{
            setError(true)
        }

    }
    const handlerChangeStatus = (taskID:string)=>{
        props.onChangeStatus(taskID)
    }


    return (
        <div className={style.todoList}>
            <h1 className={style.todoList__title}>{props.title}</h1>
           <div className={style.todoList__container}>
               <div className={style.listInput}>
                  <div className={error ? style.todoList__inputTitle:""}> <TextField  id="outlined-basic"  variant="outlined" value={newTaskInputValue}  onKeyPress={handleKeyPress}  onChange={onChangeNewTaskInputValue} /></div>
                   <Button variant="contained" size="small" onClick={onAddNewTask} >+</Button>
                   {error?<h5 className={style.errorMessage}>Field is Required</h5>: null}
               </div>
               <ul className={style.checkboxItems}>
                   {
                       props.tasks.map(t => {
                           return(
                               <>
                                   <li key={t.id}>
                                       <Checkbox  checked={t.isDone}  onChange={()=>{handlerChangeStatus(t.id)}}  /><label>{t.title}</label>
                                       <IconButton onClick={()=>{onRemoveTask(t.id)}} aria-label="delete">
                                           <DeleteIcon />
                                       </IconButton>
                                   </li>

                               </>
                           )
                       })
                   }

               </ul>
               <ButtonGroup variant="contained" aria-label="outlined primary button group">
                   <Button className={"btn"} onClick={()=>{onFilterTask("all")}} >All</Button>
                   <Button  onClick={()=>{onFilterTask("active")}} >Active</Button>
                   <Button onClick={()=>{onFilterTask("completed")}}>Completed </Button>
               </ButtonGroup>
           </div>
        </div>
    )
}