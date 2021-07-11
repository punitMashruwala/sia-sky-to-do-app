import React, { useState } from 'react'

import { withRouter } from "react-router-dom";
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

import TodoList from './TodoList';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({ id: null, text: "", isComplete: false });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TodoList edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => {
        return (
            <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>

                <div key={todo.id} onClick={() => completeTodo(todo.id)}> {todo.text} </div>
                <div className='icons'>
                    <RiCloseCircleLine
                        onClick={() => removeTodo(todo.id)}
                        className='delete-icon'
                    />
                    <TiEdit
                        onClick={() => setEdit({ id: todo.id, text: todo.text })}
                        className='edit-icon'
                    />
                </div>
            </div>
        )
    })
}

export default withRouter(Todo)
