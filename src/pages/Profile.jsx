import React, { useEffect, useState } from "react";
import "./styles/profile.css";
import Navbar from "../components/header/Navbar";
import ProfileContent from "../components/profile/ProfileContent";

const Profile = () => {
  return (
    <>
      <Navbar title={"none"} />
      <div className="profile-container">
        <ProfileContent />
      </div>
    </>
  );
};

export default Profile;
