import React from 'react'

const TodosContext = React.createContext({
    todos: [],
    setTodos: () => { }
})

export default TodosContext
