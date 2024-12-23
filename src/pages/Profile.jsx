import React, { useEffect, useState } from "react";
import "./styles/profile.css";
import Navbar from "../components/header/Navbar";
import ProfilePicture from "../components/profile/ProfileContent";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-biodata">
          <ProfilePicture />
        </div>
      </div>
    </>
  );
};

export default Profile;
