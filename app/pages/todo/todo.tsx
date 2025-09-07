import { useEffect, useReducer, useRef, useState } from "react";
import TodoItem from "~/components/TodoItem";

type TodoItem = {
  taskName: string;
  isComplete: boolean;
};

export default function todo() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { taskName: "makan", isComplete: false },
    { taskName: "minum", isComplete: true },
    { taskName: "mandi", isComplete: false },
  ]);

  const firstRender = useRef(true);

  const [addTodo, setAddTodo] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!firstRender.current) {
      setNotification("Todos has been updated");
    } else {
      firstRender.current = false;
    }
  }, [todos]);

  const addTask = () => {
    const newTodos = [...todos];
    newTodos.push({ taskName: addTodo, isComplete: false });

    setTodos(newTodos);
  };

  const deleteTask = (deleteIdx: number) => {
    const newTodos: TodoItem[] = [];

    todos.forEach((todo, idx) => {
      if (idx != deleteIdx) {
        newTodos.push(todo);
      }
    });

    setTodos(newTodos);
  };

  const changeStatus = (idx: number) => {
    const newTodos = [...todos];
    newTodos[idx].isComplete = !newTodos[idx].isComplete;

    setTodos(newTodos);
  };

  return (
    <>
      <p className="testcss">{notification}</p>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddTodo(e.target.value);
        }}
        value={addTodo}
      />
      <button
        onClick={() => {
          setAddTodo("");
        }}
      >
        Clear
      </button>

      <button onClick={addTask}>Add</button>

      <div>
        {todos.length === 0 ? <p>NO TODOS</p> : ""}
        {todos.map((todo, idx) => {
          return (
            <TodoItem
              taskName={todo.taskName}
              isComplete={todo.isComplete}
              onChangeStatus={() => {
                changeStatus(idx);
              }}
              onDeleteTask={() => {
                deleteTask(idx);
              }}
              key={todo.taskName}
            />
          );
        })}
      </div>
    </>
  );
}
