import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Room from "./Room";
import axios from "axios";

import { hangUpVideoCall, sendMessage } from "../../actions/chatActions";

const VideoCall = (props) => {
  const { pairId, socket, sender, receiver } = props.chat;
  // console.log(`chatprops: ${props.chat}`);
  // console.log(props.user);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUsername(props.user.name);
    setRoomName(pairId);
    axios
      .post("/video/token", {
        identity: props.user.name,
        room: pairId,
      })
      .then((data) => {
        // console.log(data.data.token);
        setToken(data.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = useCallback((timeElapsed) => {
    setToken(null);
    const seconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor((timeElapsed / 1000) / 60);
    const duration = minutes + " minutes " + seconds + " seconds "

    const message = "Video Call Duration: " + duration;
    const data1 = {
      pairId,
      from: sender,
      to: receiver,
      message,
      type: "text",
    };
    // console.log(data1);
    // console.log(socket);
    props.sendMessage(data1, socket);

    props.hangUpVideoCall(socket, pairId, sender, receiver);
  }, []);

  // set

  return (
    <div style={{ marginLeft: "3%", marginRight: "3%" }} data-test='VideoCallComponent'>
      {/* <h3>This is video call view</h3> */}
      {/* <h3>{token}</h3> */}
      {/* <h3>{username}</h3> */}
      {/* <h3>{roomName}</h3> */}
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          props.hangUpVideoCall(socket, pairId, sender, receiver);
        }}
      >
        Hang Up
      </Button> */}
      {token && (
        <div className="container">
          <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  hangUpVideoCall, sendMessage
})(VideoCall);
