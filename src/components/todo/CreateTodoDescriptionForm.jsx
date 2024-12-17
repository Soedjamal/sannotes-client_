import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const DescriptionForm = ({ todo, hasEdit, setMenu }) => {
  const { createTaskDesc, message, msgTimeout } = useTodo();
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

    if (desc) {
      createDescMutation.mutate({
        id: todo.id,
        taskDescription: desc,
      });
    }
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

      {msgTimeout ? (
        <p className="desc-message-on">{message}</p>
      ) : (
        <p className="desc-message-off">{message}</p>
      )}
    </form>
  );
};

export default DescriptionForm;
