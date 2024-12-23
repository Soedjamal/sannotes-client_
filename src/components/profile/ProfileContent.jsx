import { useEffect, useState } from "react";
import "./profile.css";
import { useTheUser } from "../../hooks/useTheUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTodo } from "../../hooks/useTodo";
import UsernameText from "../atoms/Username";
import { useLogout } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuthorize } from "../../hooks/useAuthorize";

const ProfileEditMenu = ({ className, userInfo, setMenu }) => {
  const [username, setUsername] = useState("");
  const { updateUsername } = useTheUser();
  const [message, setMessage] = useState(false);
  const { logout } = useLogout();

  const queryClient = useQueryClient();

  const updateUsernameMutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setMenu(false);
    },
  });

  const handleChange = (e) => {
    const usernameInput = e.target.value;

    if (usernameInput.length < 3) {
      setMessage(true);
    }

    if (usernameInput.length >= 3) {
      setMessage(false);
    }

    setUsername(usernameInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length >= 3) {
      const payload = {
        id: userInfo.id,
        username: username.trim(),
      };

      updateUsernameMutation.mutate(payload);
      setUsername("");
    }
  };

  return (
    <div className={className}>
      <div className="close-menu-bar" onClick={() => setMenu(false)}></div>
      <div className="edit-profile-form-container">
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label className="label-edit-username" htmlFor="">
            Ganti Username
          </label>
          <input
            type="text"
            className="input-edit-username"
            placeholder={userInfo?.username}
            onChange={handleChange}
          />

          <p className="alert">
            {message ? "username setidaknya 3 karakter" : null}
          </p>

          <button className="edit-profile-btn">Ganti</button>
        </form>
        <button
          onClick={() => logout()}
          style={{
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgba(255, 120, 120)",
          }}
          className="edit-profile-btn"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfilePicture = () => {
  const { getUser } = useTheUser();
  const [menu, setMenu] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { fetchTodos } = useTodo();
  const { data: todos } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTodos,
  });

  return (
    <>
      <div className="profile-content-container">
        <div className="profile-picture-container">
          <img
            src="./SNot.svg"
            alt="Profile Picture"
            className="profile-picture"
          />
        </div>
        <div className="profile-data">
          <div className="profile-details-container">
            <h2 className="profile-username">{user?.username}</h2>
            <h3 className="profile-email">{user?.email}</h3>
          </div>
          <div className="profile-edit-container">
            <button
              className="edit-profile-button"
              onClick={() => setMenu(!menu)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="task-created-container">
          <h5>
            {
              todos?.map((todo) => {
                return todo.id;
              }).length
            }{" "}
            Tasks Created
          </h5>
        </div>
        <p>|</p>
        <div className="task-completed-container">
          <h5>
            {
              todos?.filter((todo) => {
                return todo.completed;
              }).length
            }{" "}
            Tasks Completed
          </h5>
        </div>
        <p>|</p>
        <div className="task-completed-container">
          <h5>
            {
              todos?.filter((todo) => {
                return !todo.completed;
              }).length
            }{" "}
            Tasks Uncompleted
          </h5>
        </div>
      </div>

      <div
        onClick={() => setMenu(!menu)}
        className={menu ? "async-btn async-on" : "async-btn async-off"}
      ></div>

      <ProfileEditMenu
        userInfo={user}
        setMenu={(state) => setMenu(state)}
        className={menu ? "profile-edit-menu-on" : "profile-edit-menu-off"}
      />
    </>
  );
};

export default ProfilePicture;
