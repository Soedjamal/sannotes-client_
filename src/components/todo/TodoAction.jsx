import {
  faTrash,
  faPenToSquare,
  faClock,
  faSliders,
  faX,
  faC,
  faCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import EditForm from "./EditTodoForm";
import DescriptionForm from "./CreateTodoDescriptionForm";

const Todo = ({ todo, handleEdit, handleDelete }) => {
  const { completeTask, createTaskDesc } = useTodo();
  const [time, setTime] = useState(false);
  const [menu, setMenu] = useState(false);
  const queryQlient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryQlient.invalidateQueries(["tasks"]);
    },
  });

  const handleComplete = () => {
    completeMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const maxLength = 10;

  const createdAt = todo.createdAt;

  const formattedTime = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: id,
  });
  // }

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
          <h3 className="menu-action-title">Kelola Tugas.</h3>
          <EditForm
            key={todo.id}
            setMenu={() => setMenu(!menu)}
            hasEdit={() => setIsEdit(null)}
            todo={todo}
          />

          <DescriptionForm todo={todo} />

          <h5
            className="delete-icon"
            icon={faTrash}
            onClick={() => handleDelete(todo.id)}
          >
            Hapus Tugas
          </h5>

          <div className="task-info">
            <p className="createdAt">
              <FontAwesomeIcon icon={faClock} className="time" />
              {formattedTime}
            </p>
            <p className="createdAt">
              <FontAwesomeIcon icon={faCheckCircle} className="time" />
              {todo.completed ? "Tugas Selesai" : "Belum Selesai"}
            </p>
          </div>
        </div>

        <div className="close-menu-bar" onClick={() => setMenu(false)}></div>
      </div>
    </div>
  );
};

export default Todo;
