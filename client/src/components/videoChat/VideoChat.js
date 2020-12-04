import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import Room from "./Room";
import axios from "axios";
// import './chat.css';


const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await axios.post('/video/token', {
          identity: username,
          room: roomName,
        })
      .then((data) => setToken(data.data.token));
    },
    [roomName, username]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <div className="container">
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      </div>
    );
  } else {
    render = (
      <div className="container">
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }
  return render;
};

export default VideoChat;
