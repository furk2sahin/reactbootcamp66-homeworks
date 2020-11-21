import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Wrapper } from './AddTodoForm.styles';
import { createNewTodo, getTodos } from '../../services/api';
import Error from '../../components/Error/Error';
import { TodosContext, ErrorContext, LoadingContext } from '../../contexts'

export const AddTodoForm = () => {
    const [userInput, setUserInput] = useState('');
    const [showInputError, setshowInputError] = useState(false);
    const { setTodos } = useContext(TodosContext);
    const { setError } = useContext(ErrorContext);
    const { setLoading } = useContext(LoadingContext);

    const addTodoOnClick = async () => {
        if (userInput.trim().length === 0)
            setshowInputError(true);
        else {
            setLoading(true);
            try {
                const title = userInput.trim().replace(/\s\s+/g, ' '); // multiple whitespaces
                await createNewTodo({
                    title: title,
                    isDone: false,
                    user: "github.furk2sahin",
                })
                setUserInput("");
                const { data } = await getTodos();
                setTodos(data);
                setError('');
                setLoading(false);
            } catch (err) {
                setError(err);
                setTodos([]);
            }
        }
    }

    const onChangeHandler = (e) => {
        setUserInput(e.target.value);
    }

    useEffect(() => {
        if (showInputError && userInput.trim().length !== 0)
            setshowInputError(false);
    }, [userInput])

    return (
        <>
            <Wrapper>
                <Input type="text" value={userInput} placeholder="Enter todo" onChange={onChangeHandler}></Input>
                <Button onClick={addTodoOnClick}>Submit</Button>
            </Wrapper>
            <Error showError={showInputError} message="Invalid text" />
        </>
    )
}
