import React, { useState, useEffect } from "react";
import "../CSS/BoardGame.css";
import { useNavigate, useLocation } from "react-router-dom";

const BoardGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("player"));
  const [profileImage, setProfileImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [players, setPlayers] = useState([]);
  const [grid, setGrid] = useState([
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ]);

  useEffect(() => {
    if (user) {
      setFullName(user.player_name);
      setProfileImage(
        "http://localhost/BoggleGameAPI/Content/Uploads/Images/" + user.player_image
      );
      if (user.players) {
        setPlayers(user.players);
      }
    }
  }, [user]);

  const handlePreviousClick = () => {
    navigate("/home", { state: { user: user } });
  };

  return (
    <div className="Boardouter-container">
      <div className="Boardrounded-container">
        <h1>Board Screen</h1>
        <button className="back-button" onClick={handlePreviousClick}>
          &larr;
        </button>

        <div className="top-players">
          {players.slice(0, 3).map((player, index) => (
            <div key={index} className="player-profile">
              <img
                src={
                  "http://localhost/BoggleGameAPI/Content/Uploads/Images/" +
                  player.player_image
                }
                alt={player.player_name}
                className="player-image"
              />
              <div className="player-name">{player.player_name}</div>
              <div className="player-time">{player.time}</div>
            </div>
          ))}
        </div>

        <div className="eyes-icon">
          <span role="img" aria-label="eyes">
            👁
          </span>{" "}
          {players.length}
        </div>

        <div className="board-container">
          <div className="grid-container">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((letter, colIndex) => (
                  <div key={colIndex} className="grid-cell">
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="current-player">
          <img
            src={profileImage}
            alt={fullName}
            className="current-player-image"
          />
          <div className="current-player-name">{fullName}</div>
          <div className="current-player-time">{user.time}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardGame;