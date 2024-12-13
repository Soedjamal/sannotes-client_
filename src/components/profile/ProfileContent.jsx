import { useEffect, useState } from "react";
import "./profile.css";
import { useTheUser } from "../../hooks/useTheUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useTodo } from "../../hooks/useTodo";

const ProfilePicture = () => {
  const { getUser } = useTheUser();
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
            <button className="edit-profile-button">Edit Profile</button>
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
      </div>
    </>
  );
};

export default ProfilePicture;
