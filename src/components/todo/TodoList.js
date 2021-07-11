import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function TodoList(props) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const handleChanges = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: uuidv4(),
            text: input,
            isCompleted: false
        })

        setInput("")
    }

    const handleChange = e => {
        setInput(e.target.value);
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });
    // console.log("props.edit - ", props.edit)

    return (
        <>

            {props.edit && (
                <>
                    <input
                        placeholder='Update your Todo item'
                        value={input}
                        onChange={handleChange}
                        name='userName'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    &nbsp;
                    &nbsp;
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
                    </button>
                </>
            )}
            {!props.edit && (
                <>
                    <form onSubmit={handleSubmit} className='todo-form'>
                        <input
                            type='text'
                            placeholder="Add Today's Todo"
                            name='userName'
                            value={input}
                            className="login-form-input"
                            onChange={handleChanges}
                            ref={inputRef}
                        />
                        &nbsp;
                        &nbsp;
                        <button className='login-form-button'> Submit </button>
                    </form>
                </>
            )}

        </>


    )
}

export default withRouter(TodoList)
