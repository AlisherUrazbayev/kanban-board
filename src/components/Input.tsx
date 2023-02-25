import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type InputFormPropsType = {
    addTask: (item: string) => void
}

const Input: React.FC<InputFormPropsType> = ({addTask}) => {

    let [error, setError] = useState<string | null>(null);
    let [text, setText] = useState<string>("");

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        error !== null && setError(null);
    }

    const submitHandler = (text: string) => {
        if (text.trim() !== "") {
            addTask(text.trim());
            setText("");
        } else {
            setError("Invalid input");
        }
    }

    return (
        <div>
            <TextField id="outlined-basic" label={error} variant="outlined" size="small"
                       value={text} onChange={onChangeInputHandler}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") submitHandler(text);
                       }} error={!!error}
            />
            <Button variant="contained" color="primary" size="small"
                    style={{
                        maxWidth: '40px', maxHeight: '40px', minWidth: '40px',
                        minHeight: '40px', marginLeft: '10px'
                    }}
                    onClick={() => submitHandler(text)}>Add</Button>
        </div>
    );
};

export default Input;