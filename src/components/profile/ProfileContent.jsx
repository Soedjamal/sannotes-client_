import { useEffect, useState } from "react";
import "./profile.css";
import { useTheUser } from "../../hooks/useTheUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTodo } from "../../hooks/useTodo";
import { useLogout } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGear,
  faList,
  faRightFromBracket,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { BarLoader, CircleLoader } from "../atoms/Loader";
import { useNavigate } from "react-router-dom";
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

          <button
            className="edit-profile-btn"
            disabled={updateUsernameMutation.isPending && "true"}
          >
            {updateUsernameMutation.isPending ? "Mengganti.." : "Ganti"}
          </button>
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

const ProfileContent = () => {
  const { getUser } = useTheUser();
  const [menu, setMenu] = useState(false);

  const { data: user, isPending: userPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { fetchTodos } = useTodo();
  const { data: todos, isPending: todosPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTodos,
  });

  return (
    <>
      <div className="profile-content-container">
        <div className="bg-profile-container">
          <div className="profile-picture-container">
            <img
              src="./sannotesLow.svg"
              alt="Profile Picture"
              className="profile-picture"
            />
          </div>

          <div className="profile-user-info">
            <h3 className="username-title">
              {userPending ? (
                <CircleLoader size="20px" />
              ) : (
                <p>@{user?.username}</p>
              )}
            </h3>
            <p className="profile-user-bio">
              Bio gua njir, bio gua udah ganti njir, woilah kuacaw cik😂
            </p>
          </div>

          <div className="user-general-info">
            <div className="user-general-info-items">
              {/* <FontAwesomeIcon icon={faList} /> */}
              <h2>
                {" "}
                {todosPending ? (
                  <CircleLoader size={"15px"} color="gray" />
                ) : (
                  todos?.map((todo) => {
                    return todo.id;
                  }).length
                )}{" "}
              </h2>
              <h5 className="stat-name">Tugas Dibuat</h5>
            </div>

            <div className="user-general-info-items">
              {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
              <h2>
                {" "}
                {todosPending ? (
                  <CircleLoader size={"15px"} color="gray" />
                ) : (
                  todos?.filter((todo) => {
                    return todo.completed;
                  }).length
                )}{" "}
              </h2>
              <h5 className="stat-name">Tugas Selesai</h5>
            </div>

            <div className="user-general-info-items">
              {/* <FontAwesomeIcon icon={faXmarkCircle} /> */}
              <h2>
                {" "}
                {todosPending ? (
                  <CircleLoader size={"15px"} color="gray" />
                ) : (
                  todos?.filter((todo) => {
                    return !todo.completed;
                  }).length
                )}{" "}
              </h2>
              <h5 className="stat-name">Followers</h5>
            </div>
          </div>
        </div>
        <div className="profile-option">
          <button className="follow-btn">Follow Me 🚀</button>
          <FontAwesomeIcon
            className="profile-settings-btn"
            onClick={() => setMenu(!menu)}
            icon={faGear}
          />
        </div>
        {/* <div className="profile-data">
          <div className="profile-details-container">
            {userPending && <BarLoader />}
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
        </div> */}
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

export default ProfileContent;
