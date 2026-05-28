import { useState } from "react";

import "./App.css";

import { getFilterTasks } from "./utilites/getFilteredTasks";
import { v1 } from "uuid";
import { type TaskType, Todolist } from "./Todolist";
import { CreateItemForm } from "./components/CreateItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TodolistTaskType = {
  [todolistId: string]: TaskType[];
};
export function App() {
  // BLL
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<TodoListType[]>([
    { id: todolistId_1, title: "What to learn", filter: "active" },
    { id: todolistId_2, title: "What to buy", filter: "completed" },
  ]);

  const [tasks, setTasks] = useState<TodolistTaskType>({
    [todolistId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
      { id: v1(), title: "REDUX", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Cheese", isDone: false },
      { id: v1(), title: "Fruits", isDone: false },
    ],
  });
  //tasks
  const deleteTask = (
    taskId: TaskType["id"],
    todolistId: TodoListType["id"]
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const createTask = (
    title: TaskType["title"],
    todolistId: TodoListType["id"]
  ) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
    todolistId: TodoListType["id"]
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, isDone } : t
        ),
      ],
    });
  };

  const changeTaskTitle = (
    taskId: TaskType["id"],
    title: TaskType["title"],
    todolistId: TodoListType["id"]
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, title } : t
        ),
      ],
    });
  };
  //todolists
  const changeTodolistFilter = (
    filter: FilterValuesType,
    todolistId: TodoListType["id"]
  ) =>
    setTodolists(
      todolists.map((t) => (t.id === todolistId ? { ...t, filter } : t))
    );

  const deleteTodolist = (todolistId: TodoListType["id"]) => {
    setTodolists(todolists.filter((t) => t.id !== todolistId));
  };

  const createTodoList = (title: TodoListType["title"]) => {
    const newTodoId = v1();
    const newTodo: TodoListType = {
      id: newTodoId,
      title: title,
      filter: "all",
    };
    setTodolists([...todolists, newTodo]);
    setTasks({ ...tasks, [newTodoId]: [] });
  };

  const changeTodoTitle = (
    title: TodoListType["title"],
    todolistId: TodoListType["id"]
  ) =>
    setTodolists(
      todolists.map((t) => (t.id === todolistId ? { ...t, title } : t))
    );

  const todolist = todolists.map((t) => {
    const filteredTasks = getFilterTasks(tasks[t.id], t.filter);
    return (
      <Todolist
        key={t.id}
        todolistId={t.id}
        title={t.title}
        tasks={filteredTasks}
        filter={t.filter}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
        createTask={createTask}
        deleteTodoList={deleteTodolist}
        changeTodoTitle={changeTodoTitle}
        changeTaskTitle={changeTaskTitle}
      />
    );
  });
  return (
    <div className="app">
      <CreateItemForm createItem={createTodoList} maxTitleLength={15} />
      {todolist}
    </div>
  );
}
