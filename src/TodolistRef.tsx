import { useRef } from "react"
import React from 'react'
import { FilterValuesType } from "./App"
import { Button } from "./Button"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    taskCount: number
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
}

export const Todolist = ({
    taskCount,
    tasks,
    title,
    deleteTask,
    createTask,
    changeTodolistFilter
}: PropsType) => {
    // 1.const tasks = props.tasks
    // const title = props.title
    // 2.const {tasks: tasks, title: title} = props
    // 3.const { tasks, title } = props
    // 4.

    const inputRef = React.useRef<HTMLInputElement>(null)
    console.log(inputRef);

    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title="x" onClick={() => deleteTask(task.id)} />
                        </li>
                    )
                })
            }
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            <span>{taskCount}</span>

            <div>
                <input ref={inputRef} />
                <Button title="+" onClick={() => {
                    if (inputRef.current) {
                        createTask(inputRef.current.value)
                        inputRef.current.value = ""
                    }
                }} />
            </div>
            {tasksList}
            <div>
                <Button title="All" onClick={() => changeTodolistFilter("all")} />
                <Button title="Active" onClick={() => changeTodolistFilter("active")} />
                <Button title="Completed" onClick={() => changeTodolistFilter("completed")} />
            </div>
        </div>
    )
}