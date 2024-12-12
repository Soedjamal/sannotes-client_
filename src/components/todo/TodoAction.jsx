import {
  faTrash,
  faPenToSquare,
  faClock,
  faSliders,
  faX,
  faC,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import EditForm from "./EditTodoForm";

const Todo = ({ todo, handleEdit, handleDelete }) => {
  const { completeTask } = useTodo();
  const [time, setTime] = useState(false);
  const [menu, setMenu] = useState(false);
  const queryQlient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryQlient.invalidateQueries(["tasks"]);
    },
  });

  const handleComplete = () => {
    mutate({
      id: todo.id,
      completed: !todo.completed,
    });
    console.log({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const createdAt = todo.createdAt;

  const formattedTime = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: id,
  });
  // }

  const handleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  return (
    <div className="Todo">
      <div className="todo-item">
        <div className="todo-task">
          <p
            className={todo.completed ? "completed" : null}
            onClick={handleComplete}
          >
            {todo.task}
          </p>
        </div>
      </div>

      <FontAwesomeIcon
        onClick={() => setMenu(!menu)}
        icon={faSliders}
        className="todo-action"
      />

      <div
        onClick={() => setMenu(!menu)}
        className={menu ? "async-btn async-on" : "async-btn async-off"}
      ></div>
      <div className={menu ? "menu-action on" : "menu-action off"}>
        <div className="menu-action-selection">
          <h3 className="menu-action-title">Edit tugas.</h3>
          <EditForm
            key={todo.id}
            setMenu={() => setMenu(!menu)}
            hasEdit={() => setIsEdit(null)}
            todo={todo}
          />

          <div className="todo-task-description">
            <textarea
              className="txarea-input"
              placeholder="Tambahkan deskripsi tugas mu"
            ></textarea>
          </div>

          <h3 className="menu-action-title">Hapus Tugas.</h3>
          <h5
            className="delete-icon"
            icon={faTrash}
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </h5>

          <p className="createdAt">
            <FontAwesomeIcon icon={faClock} className="time" />
            {formattedTime}
          </p>
        </div>

        <FontAwesomeIcon
          className="close-menu-btn"
          onClick={() => setMenu(false)}
          icon={faX}
        />
      </div>
    </div>
  );
};

export default Todo;
