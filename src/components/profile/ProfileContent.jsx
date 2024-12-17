import { useEffect, useState } from "react";
import "./profile.css";
import { useTheUser } from "../../hooks/useTheUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTodo } from "../../hooks/useTodo";
import UsernameText from "../atoms/Username";

const ProfileEditMenu = ({ className, userInfo }) => {
  const [username, setUsername] = useState("");
  const { updateUsername } = useTheUser();

  const queryClient = useQueryClient();

  const updateUsernameMutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: userInfo.id,
      username: username.trim(),
    };

    updateUsernameMutation.mutate(payload);
  };

  return (
    <div className={className}>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label className="label-edit-username" htmlFor="">
          Ganti Username
        </label>
        <input
          type="text"
          className="input-edit-username"
          placeholder={userInfo?.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="edit-profile-btn">Ganti</button>
      </form>
    </div>
  );
};

const ProfilePicture = () => {
  const { getUser } = useTheUser();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { fetchTodos } = useTodo();
  const { data: todos } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTodos,
  });

  useEffect(() => {
    if (user) {
      setIsAuthenticated(!isAuthenticated);
    }
  }, []);

  const handleNavigation = (login, notLogin) => {
    isAuthenticated ? navigate(login) : navigate(notLogin);
  };

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
        className={menu ? "profile-edit-menu-on" : "profile-edit-menu-off"}
      />
    </>
  );
};

export default ProfilePicture;
