import React from "react";
import {TaskType} from "./App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
}
export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul style={{listStyle: "none"}}>
                <li><input type='checkbox' checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[3].isDone}/> <span>{props.tasks[3].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[4].isDone}/> <span>{props.tasks[4].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[5].isDone}/> <span>{props.tasks[5].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
