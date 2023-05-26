import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
});

export const todolistsAPI = {
    getTodolists() {
        return instance.get(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}
