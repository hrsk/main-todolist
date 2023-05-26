import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
// import {FilterValuesType, TodolistType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, getTodolistsAC, getTodolistsThunk,
    removeTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store/redux-store";
import {FilterValuesType, TasksType, TodolistDomainType} from "./types/types";
import {todolistsAPI} from "./api/API";

export const App = memo(() => {

    const todolists = useSelector<RootStateType, Array<TodolistDomainType>>(
        state => state.todolistsReducer);
    const tasks = useSelector<RootStateType, TasksType>(
        state => state.tasksReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // todolistsAPI.getTodolists()
        //     .then(response => dispatch(getTodolistsAC(response.data))
        //     )
        getTodolistsThunk(dispatch);
    }, []);

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title));
    }, []);
    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id));
    }, []);
    const changeTaskStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone));
    }, []);
    const changeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, title));
    }, []);
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, []);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, []);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, []);

    return (
        <div className="App">
            <div>
                <InputForm addTask={(value) => addTodolist(value)}/>
            </div>
            {
                todolists.map((todolist) => {

                    let allTasks = tasks[todolist.id];

                    return (
                        <Todolist key={todolist.id}
                                  todolistId={todolist.id}
                                  title={todolist.title}
                                  tasks={allTasks}
                                  filter={todolist.filter}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                                  removeTodolist={removeTodolist}/>)
                })
            }
        </div>
    );
})
