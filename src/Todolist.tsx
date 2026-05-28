import { type TodoListType, type FilterValuesType } from "./App";
import { Button } from "./Button";
import { CreateItemForm } from "./components/CreateItemForm";
import { EditableSpan } from "./components/EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  deleteTask: (taskId: TaskType["id"], todolistId: TodoListType["id"]) => void;
  changeTodolistFilter: (
    filter: FilterValuesType,
    todolistId: TodoListType["id"]
  ) => void;
  createTask: (
    title: TaskType["title"],
    todolistId: TodoListType["id"]
  ) => void;
  changeTaskStatus: (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
    todolistId: TodoListType["id"]
  ) => void;
  deleteTodoList: (todolistId: TodoListType["id"]) => void;
  changeTodoTitle: (
    title: TodoListType["title"],
    todolistId: TodoListType["id"]
  ) => void;
  changeTaskTitle: (
    taskId: TaskType["id"],
    title: TaskType["title"],
    todolistId: TodoListType["id"]
  ) => void;
};

export const Todolist = ({
  todolistId,
  tasks,
  title,
  filter,
  deleteTask,
  createTask,
  changeTaskStatus,
  changeTodolistFilter,
  deleteTodoList,
  changeTodoTitle,
  changeTaskTitle,
}: PropsType) => {
  const tasksList =
    tasks.length === 0 ? (
      <span>Tasks list is empty</span>
    ) : (
      <ul>
        {tasks.map((task: TaskType) => {
          const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
            changeTaskTitle(task.id, newTitle, todolistId);
          };
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) =>
                  changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                }
              />

              <EditableSpan
                title={task.title}
                changeTodoTitle={changeTaskTitleHandler}
                className={task.isDone ? "task-done" : "task"}
              />
              <Button
                title="x"
                onClick={() => deleteTask(task.id, todolistId)}
              />
            </li>
          );
        })}
      </ul>
    );

  const createTaskHandler = (taskTitle: TaskType["title"]) => {
    createTask(taskTitle, todolistId);
  };
  const changeTodoListTitleHandler = (newTitle: TodoListType["title"]) => {
    changeTodoTitle(newTitle, todolistId);
  };
  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          changeTodoTitle={changeTodoListTitleHandler}
        />
        <Button title="x" onClick={() => deleteTodoList(todolistId)} />
      </h3>
      <CreateItemForm createItem={createTaskHandler} maxTitleLength={15} />
      {tasksList}
      <div>
        <Button
          title="All"
          onClick={() => changeTodolistFilter("all", todolistId)}
          className={filter === "all" ? "filter-btn-active" : ""}
        />
        <Button
          title="Active"
          onClick={() => changeTodolistFilter("active", todolistId)}
          className={filter === "active" ? "filter-btn-active" : ""}
        />
        <Button
          title="Completed"
          onClick={() => changeTodolistFilter("completed", todolistId)}
          className={filter === "completed" ? "filter-btn-active" : ""}
        />
      </div>
    </div>
  );
};
