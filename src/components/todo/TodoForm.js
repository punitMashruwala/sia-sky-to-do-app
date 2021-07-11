import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Todo from './Todo'
import TodoList from './TodoList'


const today = new Date();
function TodoForm(props) {
    const [todos, setTodos] = useState([]);
    let filePath = props.filePath;

    // loadData will load the users data mySky client
    const loadData = async (event) => {
        if (!filePath || filePath === "undefined") {
            filePath = "localhost/" + props.userID;
        }

        try {
            console.log("Debug filePath - ", filePath)
            const { data } = await props.mySky.getJSON(filePath);
            // To use this elsewhere in our React app, save the data to the state.
            if (data) {
                setTodos(data.arrayList);
            } else {
                console.error('There was a problem with getJSON ', data);
                props.updateErrorMessage(`Error with getJSON: Unknown Error}`)
            }
        } catch (error) {
            console.error('There was a problem with getJSON --  ', error);
            props.updateErrorMessage(`Error with getJSON: ${error.message}`)
        }
    };

    const handleMySkyWrite = async (jsonData) => {
        if (!filePath || filePath === "undefined") {
            filePath = "localhost/" + props.userID;
        }
        try {
            console.log("Debug filePath -- ", filePath)
            await props.mySky.setJSON(filePath, jsonData);
        } catch (error) {
            props.updateErrorMessage(`Error with setJSON: ${error.message}`)
            console.log(`error with setJSON: ${error.message}`);
        }

    };


    useEffect(() => {
        async function initData() {
            if (props.userID) {
                await loadData();
            }
        }
        initData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userID, filePath]);


    const AddtoDo = async todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        if (!filePath || filePath === "undefined") {
            filePath = "localhost/" + props.userID;
        }
        const data = {
            'userID': props.userID,
            "dateTime": today,
            "filePath": filePath,
            "arrayList": newTodos
        };
        await handleMySkyWrite(data);
        await loadData()
    }

    const completeTodo = async id => {
        let updatedTodo = todos.map(x => {
            if (x.id === id) {
                x.isComplete = !x.isComplete;
            }
            return x;
        })
        setTodos(updatedTodo);
        const data = {
            'userID': props.userID,
            "dateTime": today,
            "filePath": filePath,
            "arrayList": updatedTodo
        };
        await handleMySkyWrite(data);
        await loadData()
    }

    const removeTodo = async id => {
        const newTodoArr = [...todos].filter(x => x.id !== id);
        setTodos(newTodoArr);
        const data = {
            'userID': props.userID,
            "dateTime": today,
            "filePath": filePath,
            "arrayList": newTodoArr
        };
        await handleMySkyWrite(data);
        await loadData()
    }

    const updateTodo = async (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        console.log("---", newValue)
        let updatedTodo = todos.map(x => {
            if (x.id === todoId) {
                x.text = newValue.text;
            }
            return x;
        })
        setTodos(updatedTodo);


        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        const data = {
            'userID': props.userID,
            "dateTime": today,
            "filePath": filePath,
            "arrayList": updatedTodo
        };
        await handleMySkyWrite(data);
        await loadData()
    };

    return (
        <>
            <div>
                <br></br>
                <TodoList onSubmit={AddtoDo} />
                <br></br>
                <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
            </div>
        </>
    )
}

export default withRouter(TodoForm)