import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Icon, TitleInput } from './TodoCard.styles'
import { updateTodo, deleteTodo, getTodos } from '../../services/api'
import { TodosContext, ErrorContext, LoadingContext } from '../../contexts'

export const TodoCard = ({ todo }) => {
    const temp = todo.title; // control isEditted
    const [inputValue, setInputValue] = useState(todo.title);
    const [isEditted, setIsEditted] = useState(false);
    const { setTodos } = useContext(TodosContext);
    const { setError } = useContext(ErrorContext);
    const { setLoading } = useContext(LoadingContext);

    const onChangeHandler = (e) => {
        if (!todo.isDone)
            setInputValue(e.target.value);
    }

    const doneOnClickHandler = async () => {
        setLoading(true);
        try {
            await updateTodo(todo.id, {
                ...todo,
                isDone: !todo.isDone,
            });
            const { data } = await getTodos();
            setTodos(data);
            setError('');
            setLoading(false);
        } catch (err) {
            setError(err);
            setTodos([]);
        }
    }

    const saveOnClickHandler = async () => {
        setLoading(true);
        try {
            await updateTodo(todo.id, {
                ...todo,
                title: inputValue,
            })
            const { data } = await getTodos();
            setTodos(data);
            setError('');
            setLoading(false);
            setIsEditted(false);
        } catch (err) {
            setError(err);
            setTodos([]);
        }
    }

    const deleteOnClickHandler = async () => {
        setLoading(true);
        try {
            await deleteTodo(todo.id);
            const { data } = await getTodos();
            setTodos(data);
            setError('');
            setLoading(false);
        } catch (err) {
            setTodos([]);
            setError(err);
        }
    }

    useEffect(() => {
        if (temp !== inputValue.trim().replace(/\s\s+/g, ' ') && inputValue.trim().length !== 0)
            setIsEditted(true);
        else
            setIsEditted(false);
    }, [inputValue])

    return (
        <Card>
            {inputValue.length === 0 ? <div style={{ fontSize: "45px", color: "red" }}>x</div> : null}
            <TitleInput value={inputValue} onChange={onChangeHandler} style={{
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "red" : "black",
                border: isEditted ? "2px solid #DE803B" : "0",
            }} />

            <Icon onClick={doneOnClickHandler} style={{ pointerEvents: isEditted ? "none" : "" }}>
                Done<FontAwesomeIcon icon="check" style={{ color: todo.isDone ? "red" : "gray" }} />
            </Icon>
            <hr />
            <Icon onClick={saveOnClickHandler} style={{
                color: isEditted ? "red" : "gray",
                backgroundColor: isEditted ? "#F3F9DE" : "",
                pointerEvents: isEditted ? "" : "none"
            }}>
                Save<FontAwesomeIcon icon="save" />
            </Icon>
            <hr />
            <Icon onClick={deleteOnClickHandler}>
                Delete<FontAwesomeIcon icon="trash" />
            </Icon>
        </Card>
    )
}
