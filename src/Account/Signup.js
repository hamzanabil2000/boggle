import React, { useState } from "react";
import "../CSS/Signup.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [playerUid, setPlayerUid] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate user input before making the API call
    if (!playerUid || !fullName || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append(
      "player",
      JSON.stringify({
        player_uid: playerUid,
        player_name: fullName,
        password: password,
      })
    );

    try {
      const response = await fetch(
        "http://localhost/BoggleGameAPI/api/Account/signUp",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        toast.error("User already exists.");
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  return (
    <div className="signupouter-container">
      <Toaster /> {/* Add Toaster here */}
      <div className="singuprounded-container">
        <h1>CREATE AN ACCOUNT</h1>
        <form>
          <PersonIcon
            style={{
              transform: "translateY(175%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="text"
            placeholder="Enter Player User Id"
            value={playerUid}
            onChange={(e) => setPlayerUid(e.target.value)}
          />

          <PersonIcon
            style={{
              transform: "translateY(175%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="text"
            placeholder="Enter Player Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <LockIcon
            style={{
              transform: "translateY(175%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LockIcon
            style={{
              transform: "translateY(175%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input type="password" placeholder="Confirm Password" />

          <button className="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
