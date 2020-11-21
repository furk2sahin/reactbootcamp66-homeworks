import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://5faad17ab5c645001602b29c.mockapi.io/api'
})

export const getTodos = () => {
    return instance.get('/todos');
}

export const createNewTodo = (todo) => {
    return instance.post('/todos', todo);
}

export const deleteTodo = (id) => {
    return instance.delete(`/todos/${id}`);
}

export const updateTodo = (id, todo) => {
    return instance.put(`/todos/${id}`, todo)
}

export default instance;