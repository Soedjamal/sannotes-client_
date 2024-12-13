import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const queryQlient = useQueryClient();
  const { createTodo } = useTodo();

  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryQlient.invalidateQueries(["tasks"]);
      setTask("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = { task };

    if (task) {
      mutate(todo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        className="todo-input"
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        placeholder="Add your task"
      />
      <button className="todo-btn" type="submit">
        {isPending ? "Add.." : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
