// import {FilterValuesType} from "../types";
import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType, TodolistResponseType} from "../types/types";
import {AnyAction, Dispatch} from "redux";
import {todolistsAPI} from "../api/API";
import {ThunkAction} from "redux-thunk";
import {AppDispatch, RootStateType} from "./redux-store";

const initialState: Array<TodolistDomainType> = [];
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.title
            } : todolist)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        case 'ADD_TODOLIST':
            const todolist = {
                id: action.todolistId,
                title: action.todolist.title,
                filter: 'All',
                order: 0,
                addedDate: ''
            };
            return [...state, {...action.todolist, filter: 'All'}]
        case 'REMOVE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'GET_TODOLISTS': {
            return action.todolists.map(todolist => {
                return {
                    ...todolist, filter: 'All'
                }
            })
        }
        default:
            return state;
    }
}

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>;

type ActionsType = ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType;

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        title,
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        filter,
    } as const
}

export const addTodolistAC = (todolist: TodolistResponseType) => {
    return {
        type: 'ADD_TODOLIST',
        todolistId: v1(),
        todolist,
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    } as const
}

export const getTodolistsAC = (todolists: TodolistResponseType[]) => {
    return {
        type: 'GET_TODOLISTS',
        todolists,
    } as const
}

export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(getTodolistsAC(response.data))
        })
}

export const createTodolistThunk = (title: string) => (dispatch: Dispatch<AddTodolistActionType>) => {
    todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))

            }
        })
}
