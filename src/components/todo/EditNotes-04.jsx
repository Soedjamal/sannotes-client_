import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const EditForm = ({ todo, hasEdit, setMenu }) => {
  const { editTask } = useTodo();
  const [value, setValue] = useState(todo.task);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      hasEdit();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      mutate({ id: todo.id, task: value });
    }

    setMenu();
  };

  return (
    <form onSubmit={handleSubmit} className="TodoFormEdit">
      <input
        className="todo-edit-input"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Edit your task"
      />
      <button className="todo-btn-edit" type="submit">
        Edit
      </button>
    </form>
  );
};

export default EditForm;
