import style from "./todoList.module.css"
import {Button} from '@radix-ui/themes';
import React, {useState} from "react";
import {FilterTypes} from "../../App";
import {TodoListTitle} from "./todoListTitle/TodoListTitle";
import {TodoTasksTitle} from "./todoTasksTitle/TodoTasksTitle";
import {TextField} from "@radix-ui/themes";


// тип тасков
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
    editMode: false
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
    removeTodoList: (todoListID: string) => void
    activateEditMode: (todoListID: string) => void
    editTitleMode: boolean
    deactivateEditMode: (todoListID: string, newTitle: string) => void
    editModeTaskTitle: boolean
    activateTaskTitleEditMode: (todoTaskID: string) => void
    deActivateTaskTitleEditMode: (todoTaskID: string, newTitle: string) => void

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
    const handlerRemoveTodoList = (todoListID: string) => {
        props.removeTodoList(todoListID)
    }


    const handlerActivateEditMode = (todoListID: string) => {
        props.activateEditMode(todoListID)
    }


    let [titleInputValue, setTitleInputValue] = useState(props.title)
    const handlerChangeTitleInputValue = (e: any) => {
        setTitleInputValue(e.currentTarget.value)
    }
    const deactivateEditMode = (todoListID: string) => {
        if (titleInputValue.trim()) props.deactivateEditMode(todoListID, titleInputValue.trim())

    }

    let [activeButton, setActiveButton] = useState("all")

    return (
        <div className={"todoListContainer"}>
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
                        <div style={{display: "inline-block"}} className={error ? style.todoList__inputTitle : ""}>
                            <TextField.Input
                                placeholder="Add tasks"
                                value={newTaskInputValue}
                                style={{
                                    border: "none",
                                    padding: "5px 10px",
                                    borderBottom: "1px solid rgba(0, 0, 0, 0.8)",
                                    background: "none"
                                }}
                                onKeyPress={(e) => {
                                    handlerKeyPress(e, props.todoListID)
                                }}
                                onChange={handlerChangeNewTaskInputValue}
                            />

                        </div>
                        <Button onClick={() => {
                            handlerAddNewTask(props.todoListID)}}
                            style={{border:"none", padding:"5px 15px",background:"#F2E2FC",cursor:"pointer"}}
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                    fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </Button>
                        {error ? <h5 className={style.errorMessage}>Field is Required</h5> : null}
                    </div>
                    <ul style={{marginBottom:"25px"}} className={style.checkboxItems}>
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

                    <div className={style.filterBtnGroup}>
                        <Button className={style.filterBtn}
                                style={{background: activeButton === "all" ? "#F2E2FC" : "inherit"}}
                                onClick={() => {
                                    handlerFilterTask(props.todoListID, "all")
                                }}>All</Button>
                        <Button className={style.filterBtn}
                                style={{background: activeButton === "active" ? "#F2E2FC" : "inherit"}} onClick={() => {
                            handlerFilterTask(props.todoListID, "active")
                        }}>Active</Button>
                        <Button className={style.filterBtn} variant="soft"
                                style={{background: activeButton === "completed" ? "#F2E2FC" : "inherit"}}
                                onClick={() => {
                                    handlerFilterTask(props.todoListID, "completed")
                                }}>Completed </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
