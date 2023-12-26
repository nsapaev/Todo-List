import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import s from "./AddNewTodoListForm.module.css"

export const AddNewTodoListForm = (props:any) => {

    let [inputValue, setInputValue] = useState("")
    let [error, setError] = useState(false)
    const handleChangeInputValue = (e:any) => {
            setError(false)
            setInputValue(e.currentTarget.value)
    }
    const handleAddNewTodoList = ():void => {
        if(!inputValue.trim()){
            setError(true)

        }else{
            props.addTodoList(inputValue)
            setInputValue("")
        }

    }
    const handleAddNewTodoListOnKeyPress =(e:any)=>{
        if( e.charCode == 13){
            e.preventDefault()
        }
        console.log(e.charCode)
        if(inputValue.trim() && e.charCode == 13){
            e.preventDefault()
            props.addTodoList(inputValue)
            setInputValue("")
        }else{
            setError(true)
        }
    }
    return (
        <form>
            <TextField id="standard-basic" label={error?"Todo Title is Require":"List Title"} onKeyPress={handleAddNewTodoListOnKeyPress} variant="standard" onChange={handleChangeInputValue} value={inputValue}/>
            <Button type={"button"} variant="outlined" size="medium" onClick={() => {handleAddNewTodoList()}}>Add Todo List</Button>
        </form>
    )
}