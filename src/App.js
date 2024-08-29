import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Account/Login";
import Signup from "./Account/Signup";
import Home from "./Components/Home";
import EditProfile from "./Components/EditProfile";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Account */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Edit Profile */}
          <Route path="/editprofilescreen" element={<EditProfile />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
