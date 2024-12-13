import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const DescriptionForm = ({ todo, hasEdit, setMenu }) => {
  const { createTaskDesc } = useTodo();
  const [desc, setDesc] = useState(todo.taskDescription);
  const queryQlient = useQueryClient();

  const createDescMutation = useMutation({
    mutationFn: createTaskDesc,
    onSuccess: () => {
      queryQlient.invalidateQueries(["tasks"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createDescMutation.mutate({
      id: todo.id,
      taskDescription: desc,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-task-description">
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        value={desc || ""}
        spellCheck="false"
        className="txarea-input"
        placeholder="Tambahkan deskripsi tugas mu"
      ></textarea>
      <button type="submit" className="task-desc-btn">
        Tambah Deskripsi
      </button>
    </form>
  );
};

export default DescriptionForm;
