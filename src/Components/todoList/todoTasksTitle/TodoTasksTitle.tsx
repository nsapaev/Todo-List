import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useReducer, useState} from "react";


export const TodoTasksTitle = (props: any) => {


    let [inputValue, setInputValue] = useState("")
    const activateEditMode = (id: string, title: string) => {
        props.activateTaskTitleEditMode(id)
        setInputValue(title)
    }
    const deactivateEditMode = (id: string) => {
        if(inputValue.trim()){
            props.deActivateTaskTitleEditMode(id, inputValue)
        }

    }

    const deactivateEditModeOnKeyPress = (id:string,e:any)=>{
        if(inputValue.trim() && e.charCode === 13){
            props.deActivateTaskTitleEditMode(id, inputValue)
        }
    }

    const changeInputTitleValue = (e: any) => {
        setInputValue(e.currentTarget.value)
    }


    return (
        <>
            {
                props.tasks.map((t: any) => {
                    return (
                        <>
                            <li key={t.id}>

                                <div
                                    style={{display: "flex", justifyContent: "space-between"} }>
                                   <div>
                                       <Checkbox
                                           checked={t.isDone}
                                           onChange={() => {
                                               props.handlerChangeStatus(props.todoListID, t.id)
                                           }}
                                       />

                                       {
                                           !t.editMode &&
                                           <label
                                               onDoubleClick={() => activateEditMode(t.id, t.title)}>{t.title}</label> ||
                                           t.editMode &&
                                           <input autoFocus
                                                  value={inputValue}
                                                  onChange={changeInputTitleValue}
                                                  onBlur={() => {
                                                      deactivateEditMode(t.id)
                                                  }}
                                                  onKeyPress={(e)=>{ deactivateEditModeOnKeyPress(t.id,e)}}
                                           />

                                       }
                                   </div>


                                    <IconButton
                                        onClick={() => {
                                            props.handlerRemoveTask(props.todoListID, t.id)
                                        }}
                                        aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </li>

                        </>
                    )
                })
            }

        </>
    )
}