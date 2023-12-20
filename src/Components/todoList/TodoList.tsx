import style from "./todoList.module.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import React from "react";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TasksType>,
}

export const TodoList = (props:PropsType) => {
    return (
        <div className={style.todoList}>
            <h1 className={style.todoList__title}>{props.title}</h1>
           <div className={style.todoList__container}>
               <div className={style.listInput}>
                   <TextField id="outlined-basic" label="enter your text" variant="outlined" />
                   <Button variant="contained" size="small">+</Button>
               </div>
               <ul className={style.checkboxItems}>
                   <li><Checkbox  checked={props.tasks[0].isDone} defaultChecked /><label>{props.tasks[0].title}</label></li>
                   <li><Checkbox  checked={props.tasks[1].isDone}  /><label>{props.tasks[1].title}</label></li>
                   <li><Checkbox  checked={props.tasks[2].isDone} /><label>{props.tasks[2].title}</label></li>
               </ul>
               <ButtonGroup variant="contained" aria-label="outlined primary button group">
                   <Button>All</Button>
                   <Button>Active</Button>
                   <Button>Completed</Button>
               </ButtonGroup>
           </div>
        </div>
    )
}