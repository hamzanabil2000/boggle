import React, { useState } from "react";
import "../CSS/Login.css";
import BoggleImage from "../Assets/Images/BoggleImage.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/BoggleGameAPI/api/Account/login?uid=${userName}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // response.ok is true for status codes in the range 200-299
        localStorage.setItem("player", JSON.stringify(data));
        localStorage.setItem("photo", JSON.stringify(data));

        // Redirect to home page
        navigate("/home", { state: { user: data } });
      } else {
        // Handle specific error codes
        if (response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else {
          alert("An error occurred: " + data.message);
        }
      }
    } catch (error) {
      alert("Error during login: " + error.message);
      console.error("An error occurred while processing your request:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="outer-container">
      <div className="rounded-container">
        <h1>LOGIN</h1>
        <img src={BoggleImage} alt="" />
        <form onSubmit={handleLogin}>
          <PersonIcon
            style={{
              transform: "translateY(125%)",
              color: "blue",
              marginRight: "280px",
            }}
          />
          <input
            type="text"
            placeholder="Enter User Name"
            onChange={(e) => setUserName(e.target.value)}
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
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
