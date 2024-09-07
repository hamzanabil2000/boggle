import React, { useState, useEffect } from "react";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../Assets/Images/ProfilePic.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // Importing Toaster and toast

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Home = () => {
  const location = useLocation();
  const user = location.state?.user || null;
  const [fullName, setFullName] = useState(null);
  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [createOpen, setCreateOpen] = useState(false); // For "Create Game" modal
  const [joinOpen, setJoinOpen] = useState(false); // For "Join Game" modal
  const [players, setPlayers] = useState("");
  const [time, setTime] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // For "Waiting for others" message

  const navigate = useNavigate();

  // Use useEffect to set the fullName once after the component mounts
  useEffect(() => {
    if (user) {
      setFullName(user.player_name);
      setProfilePic(
        "http://localhost/BoggleGameAPI/Content/Uploads/Images/" +
          user.player_image
      );
    }
  }, [user]);

  const handlePreviousClick = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    navigate("/profile", { state: { user: user } });
  };

  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleJoinOpen = () => setJoinOpen(true);
  const handleJoinClose = () => setJoinOpen(false);
  const handlePlayersChange = (event, newPlayers) => {
    setPlayers(newPlayers);
  };

  const handleTimeChange = (event, newTime) => {
    setTime(newTime);
  };

  const handleCreateGame = () => {
    if (!players || !time) {
      toast.error("Please select both number of players and time."); // Show error if either is not selected
      return;
    }

    const player = JSON.parse(localStorage.getItem("player"));
    const pid = player?.player_uid;

    if (!pid) {
      console.error("Player ID is missing.");
      return;
    }

    // Mapping string values to numbers
    const playerCountMap = {
      "2P": 2,
      "3P": 3,
      "4P": 4,
    };

    const timeMap = {
      "60s": 60,
      "75s": 75,
    };

    const gameData = {
      no_of_player: playerCountMap[players],
      time: timeMap[time],
    };

    console.log("Game Data being sent:", gameData);
    console.log("Player ID:", pid);

    // Set waiting message
    setIsWaiting(true);

    fetch(`http://localhost/BoggleGameAPI/api/Game/CreateGame?pid=${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error("Failed to create game");
        }
      })
      .then((message) => {
        console.log("Game created successfully:", message);
        toast.success("Game created successfully!"); // Display success message
        setCreateOpen(false); // Close the modal after successful creation
      })
      .catch((error) => {
        console.error("Error creating game:", error);
        toast.error("Failed to create game"); // Display error message
        setIsWaiting(false); // Remove waiting message in case of error
      });
  };


  const handleJoinRoom = (roomId) => {
    navigate("/board", { state: { user: user } });
    console.log(`Joining room ${roomId}`);
    // Implement join room logic here
    toast.success(`Joined room ${roomId} successfully!`);
  };

  const handleSpectateRoom = (roomId) => {
    console.log(`Spectating room ${roomId}`);
    // Implement spectate room logic here
    toast.success(`Spectating room ${roomId}`);
  };

  return (
    <div className="Homeouter-container">
      <Toaster /> {/* Renders the Toaster for displaying toasts */}
      <div className="Homerounded-container">
        <h1>HOME</h1>
        <div className="profile-pic-container">
          <img src={profilePic} className="profile-pic" alt="Profile" />
          <span className="profile-name">{fullName || "Loading..."}</span>
        </div>
        <div className="profile-section">
          <span className="edit-icon" onClick={handleNextClick}>
            &#9998;
          </span>
        </div>
        <div className="buttons">
          <button className="buttonCreate" onClick={handleCreateOpen}>
            Create Game
          </button>
          <br />
          <button className="buttonJoin" onClick={handleJoinOpen}>
            Join
          </button>
          <br />
          <button onClick={handlePreviousClick} className="buttonLogout">
            Logout
          </button>
          <br />
        </div>
      </div>
      {/* Create Game */}
      <Modal
        open={createOpen}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Create Game
          </Typography>
          <div style={{ marginTop: 16, textAlign: "center", width: "100%" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Number of Players
            </Typography>
            <ToggleButtonGroup
              value={players}
              exclusive
              onChange={handlePlayersChange}
              aria-label="number of players"
              style={{ marginTop: 8, marginBottom: "20px" }}
            >
              <ToggleButton
                value="2P"
                aria-label="2 players"
                style={{
                  borderRadius: "50%",
                  padding: "10px 20px",
                  margin: "0 8px",
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: players === "2P" ? "blue" : "",
                  color: players === "2P" ? "white" : "",
                }}
              >
                2P
              </ToggleButton>
              <ToggleButton
                value="3P"
                aria-label="3 players"
                style={{
                  borderRadius: "50%",
                  padding: "10px 20px",
                  margin: "0 8px",
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: players === "3P" ? "blue" : "",
                  color: players === "3P" ? "white" : "",
                }}
              >
                3P
              </ToggleButton>
              <ToggleButton
                value="4P"
                aria-label="4 players"
                style={{
                  borderRadius: "50%",
                  padding: "10px 20px",
                  border: "1px solid black",
                  margin: "0 8px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: players === "4P" ? "blue" : "",
                  color: players === "4P" ? "white" : "",
                }}
              >
                4P
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ marginTop: 16, textAlign: "center", width: "100%" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Time
            </Typography>
            <ToggleButtonGroup
              value={time}
              exclusive
              onChange={handleTimeChange}
              aria-label="game time"
              style={{ marginTop: 8 }}
            >
              <ToggleButton
                value="60s"
                aria-label="60 seconds"
                style={{
                  borderRadius: "50%",
                  padding: "10px 20px",
                  margin: "0 8px",
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: time === "60s" ? "blue" : "",
                  color: time === "60s" ? "white" : "",
                }}
              >
                60s
              </ToggleButton>
              <ToggleButton
                value="75s"
                aria-label="75 seconds"
                style={{
                  borderRadius: "50%",
                  padding: "10px 20px",
                  margin: "0 8px",
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: time === "75s" ? "blue" : "",
                  color: time === "75s" ? "white" : "",
                }}
              >
                75s
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={handleCreateGame}
              style={{
                marginTop: "20px",
                borderRadius: "20px",
                backgroundColor: "green",
                color: "#fff",
              }}
            >
              Create Game
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Join Game */}
      <Modal
        open={joinOpen}
        onClose={handleJoinClose}
        aria-labelledby="join-modal-title"
        aria-describedby="join-modal-description"
      >
        <Box sx={style} style={{ width: "350px" }}>
          <Typography
            id="join-modal-title"
            variant="h6"
            component="h2"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Active Games
          </Typography>
          <div style={{ width: "100%", textAlign: "center" }}>
            {/* Room 1 */}
            <div className="room-container">
              <div className="room-info">
                <span>Room1</span>
                <span>3/4</span>
              </div>
              <div className="room-actions">
                <button
                  variant="contained"
                  onClick={() => handleSpectateRoom(1)}
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    margin: "0 8px",
                    border: "1px solid black",
                    backgroundColor: "green",
                    color: "#fff",
                  }}
                >
                  Spectate
                </button>
                <button
                  variant="contained"
                  onClick={() => handleJoinRoom(1)}
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    margin: "0 8px",
                    border: "1px solid black",
                    backgroundColor: "green",
                    color: "#fff",
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleJoinClose}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "20px",
            }}
          >
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
