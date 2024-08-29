import React, { useState, useEffect } from "react";
import "../CSS/EditProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../Assets/Images/ProfilePic.jpg";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState(ProfilePic);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("player"));

  useEffect(() => {
    if (user) {
      setFullName(user.player_name || "");
      setProfileImage(
        user.player_image
          ? "http://localhost/BoggleGameAPI/Content/Uploads/Images/" +
              user.player_image
          : ProfilePic
      );
    }
  }, [user]);

  const handlePreviousClick = () => {
    navigate("/profile", { state: { user: user } });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    const player = JSON.parse(localStorage.getItem("player"));

    // Validation logic with individual alerts
    if (!fullName) {
      alert("Please enter your name.");
      return; // Prevent further execution
    }

    if (newPassword) {
      if (!oldPassword) {
        alert("Please enter your old password.");
        return; // Prevent further execution
      }

      if (!confirmPassword) {
        alert("Please confirm your new password.");
        return; // Prevent further execution
      }

      if (newPassword !== confirmPassword) {
        alert("New Password and Confirm Password do not match.");
        return; // Prevent further execution
      }
    }

    // Prepare data to be sent
    const playerData = {
      player_uid: player.player_uid,
      player_name: fullName,
      password: newPassword || undefined, // Send password only if it's provided
    };

    const formData = new FormData();
    formData.append("player", JSON.stringify(playerData));
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    // Perform the fetch request
    fetch(`http://localhost/BoggleGameAPI/api/Player/EditPlayer`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((message) => {
            throw new Error(`Failed to update profile: ${message}`);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("player", JSON.stringify(data));
        alert("Profile updated successfully!");
        navigate("/home", { state: { user: data } });
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editProfile-container">
      <div className="editProfilerounded-container">
        <h1>EDIT PROFILE</h1>
        <button className="back-button" onClick={handlePreviousClick}>
          &larr;
        </button>
        <div className="editprofile-pic-container">
          <img src={profileImage} alt="Profile" className="editprofile-pic" />
          <div className="editprofile-section">
            <label className="camera-icon" htmlFor="file-input">
              &#x1F4F7;
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <span className="editprofile-name">{fullName || "Loading..."}</span>
        </div>

        <form>
          <PersonIcon
            style={{
              transform: "translateY(125%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <LockIcon
            style={{
              transform: "translateY(125%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="password"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <LockIcon
            style={{
              transform: "translateY(125%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <LockIcon
            style={{
              transform: "translateY(125%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>

        <button className="buttonSave" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
