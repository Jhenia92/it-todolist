import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  filter: FilterValues;
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (taskId: Task["id"], isDone: Task["isDone"]) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState(false);

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      createTask(trimmedTitle);
    } else {
      setError(true);
    }

    setTaskTitle("");
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTaskHandler();
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {taskTitle.length === 0 && (
          <div style={{ color: error ? "red" : "inherit" }}>
            Enter title and press button
          </div>
        )}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };
            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => changeTaskStatus(task.id, e.currentTarget.checked);

            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span className={task.isDone ? "task-done" : "task"}>
                  {task.title}
                </span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "filter-btn-active" : ""}
          title={"All"}
          onClick={() => changeFilter("all")}
        />
        <Button
          className={filter === "active" ? "filter-btn-active" : ""}
          title={"Active"}
          onClick={() => changeFilter("active")}
        />
        <Button
          className={filter === "completed" ? "filter-btn-active" : ""}
          title={"Completed"}
          onClick={() => changeFilter("completed")}
        />
      </div>
    </div>
  );
};
