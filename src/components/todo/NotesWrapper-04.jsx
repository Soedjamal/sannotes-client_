import EditForm from "./EditNotes-04";
import TodoForm from "./NotesForm-04";
import Todo from "./Notes-04";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTodo } from "../../hooks/useTodo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TodoWrapper = () => {
  const [isEdit, setIsEdit] = useState(null);
  const [sortType, setSortType] = useState("latest");

  const { fetchTodos, deleteTodo } = useTodo();
  const { data: todos } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTodos,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const getSortedTodos = () => {
    if (!todos) return [];
    return [...todos].sort((a, b) => {
      if (sortType === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortType === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
  };

  return (
    <div className="TodoWrapper">
      <div className="todo-title-container">
        <h3 className="todos-title">TodoList</h3>
        <div className="sort">
          <FontAwesomeIcon
            icon={faArrowUp}
            className="sort-ico"
            onClick={() => setSortType("latest")}
          />
          <FontAwesomeIcon
            icon={faArrowDown}
            className="sort-ico"
            onClick={() => setSortType("oldest")}
          />
        </div>
      </div>

      <TodoForm />
      <div className="todo-lists">
        {getSortedTodos().map((todo) =>
          isEdit === todo.id ? (
            <EditForm
              key={todo.id}
              hasEdit={() => setIsEdit(null)}
              todo={todo}
            />
          ) : (
            <Todo
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleEdit={(id) => setIsEdit(id)}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default TodoWrapper;
