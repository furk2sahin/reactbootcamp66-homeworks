import React, { useEffect, useState } from 'react'
import { AddTodoForm } from './AddTodoForm/AddTodoForm'
import { Title } from './Title/Title'
import { TodoCard } from './TodoCard/TodoCard'
import { getTodos } from '../services/api'
import Error from '../components/Error/Error'
import { TodosContext, ErrorContext, LoadingContext } from '../contexts'
import Loader from './Loader/Loader'

export const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const init = async () => {
            try {
                const { data } = await getTodos();
                setTodos(data);
                setError('');
                setLoading(false);
            } catch (err) {
                setError(err);
                setTodos([]);
            }
        }
        init();
    }, [])

    return (
        <>
            <TodosContext.Provider value={{ todos, setTodos }}>
                <ErrorContext.Provider value={{ error, setError }}>
                    <LoadingContext.Provider value={{ loading, setLoading }}>
                        <Title todoCount={todos.length} />
                        {todos.length === 0 ? "Empty List" : null}
                        {error !== '' ? <Error message={error.toString()} showError={true} /> :
                            !loading ? todos.map(todo =>
                                <TodoCard todo={todo} key={todo.id} />) :
                                <Loader />
                        }
                        <hr />
                        <AddTodoForm />
                    </LoadingContext.Provider>
                </ErrorContext.Provider >
            </TodosContext.Provider>
        </>
    )
}
