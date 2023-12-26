import React from "react"
import TextField from "@mui/material/TextField";
import style from "../todoList.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


export const TodoListTitle = (props:any) => {
    return (<>
        <h1 className={style.todoList__title}  >
            {
                !props.editTitleMode && <span onDoubleClick={() => {
                    props.handlerActivateEditMode(props.todoListID)
                }}>{props.title}  </span> ||
                props.editTitleMode && <TextField value={props.titleInputValue} onChange={(e) => {
                    props.handlerChangeTitleInputValue(e)
                }} onBlur={() => {
                    props.deactivateEditMode(props.todoListID)
                }} id="standard-basic" variant="standard"/>
            }
            <IconButton onClick={() => {
                props.handlerRemoveTodoList(props.todoListID)
            }} aria-label="delete"><DeleteIcon/></IconButton></h1>
        </>
    )
}