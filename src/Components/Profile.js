import React, { useState, useEffect } from "react";
import "../CSS/Profile.css";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const user = location.state?.user;
  // const user = location.state?.user || null;
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("player"));
  const [profileImage, setProfileImage] = useState("");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (user) {
      setFullName(user.player_name);
      setProfileImage(
        "http://localhost/BoggleGameAPI/Content/Uploads/Images/" +
          user.player_image
      );
    }
  }, [user]);
  const handlePreviousClick = () => {
    navigate("/home", { state: { user: user } });
  };

  const handleNextClick = () => {
    navigate("/editprofilescreen", { state: { user: user } });
  };

  return (
    <div className="profile-container">
      <div className="profilerounded-container">
        <h1>PROFILE</h1>
        <button className="back-button" onClick={handlePreviousClick}>
          &larr;
        </button>

        <div className="editprofile-pic-container">
          <img src={profileImage} alt="Profile" className="editprofile-pic" />
          <div className="editprofile-section">
            <label className="profileedit-icon" htmlFor="file-input">
              &#9998;
            </label>
          </div>
          <span className="editprofile-name">{fullName || "Loading..."}</span>
        </div>

        <button className="buttonSave" onClick={handleNextClick}>
          Edit
        </button>

        <div className="profile-stats">
          <table>
            <tbody>
              <tr>
                <td className="profile-stat-label">Score :</td>
                <td className="profile-stat-value">1000</td>
              </tr>
              <tr>
                <td className="profile-stat-label">Game played :</td>
                <td className="profile-stat-value">4</td>
              </tr>
              <tr>
                <td className="profile-stat-label">Games won :</td>
                <td className="profile-stat-value">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
