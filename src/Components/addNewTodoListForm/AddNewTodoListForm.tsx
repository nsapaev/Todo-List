import React, {useState} from 'react';
import {TextField, DropdownMenu,Button as Buttton}  from "@radix-ui/themes";
import Button from '@mui/material/Button';
import s from "./AddNewTodoListForm.module.css"
import {CaretDownIcon} from "@radix-ui/react-icons";

export const AddNewTodoListForm = (props: any) => {

    let [inputValue, setInputValue] = useState("")
    let [error, setError] = useState(false)
    const handleChangeInputValue = (e: any) => {
        setError(false)
        setInputValue(e.currentTarget.value)
    }
    const handleAddNewTodoList = (): void => {
        if (!inputValue.trim()) {
            setError(true)

        } else {
            props.addTodoList(inputValue)
            setInputValue("")
        }

    }
    const handleAddNewTodoListOnKeyPress = (e: any) => {
        if (e.charCode === 13) {
            e.preventDefault()
        }
        if (inputValue.trim() && e.charCode === 13) {
            e.preventDefault()
            props.addTodoList(inputValue)
            setInputValue("")
        } else if(!inputValue.trim() && e.charCode === 13) {
            setError(true)
        }
    }

    const TextInput = s.TextInput
    const errorMessage = s.TextInputError

    return (
        <div className={s.header}>
            <div className={s.header__container}>
                <form>
                    <TextField.Input className={error? s.TextInputError: s.TextInput}
                        placeholder={error?"Field is required":"todo title"}
                        onKeyPress={handleAddNewTodoListOnKeyPress}
                        onChange={handleChangeInputValue}
                        value={error?"" :inputValue}
                        onFocus={()=>{setError(false)}}
                    />

                    <Button type={"button"} variant="outlined" size="medium" onClick={() => {
                        handleAddNewTodoList()
                    }}>Add Todo List</Button>
                </form>

            </div>
        </div>

    )
}