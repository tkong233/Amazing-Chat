import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Button from "@material-ui/core/Button";
import Participant from "./Participant";
import Timer from "react-compound-timer";

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setStartTime(new Date());
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function(
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  // const handleClick = () => {
  //   const endTime = new Date();
  //   handleLogout(endTime - startTime);
  // }

  return (
    <div className="room">
      {/* <h2>Room: {roomName}</h2> */}
      <div style={{marginTop: "50px", display: "flex", justifyContent: "space-between"}}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Exit Chat Room
      </Button>
      {/* <button onClick={handleLogout}>Exit Chat Room</button> */}
      {/* <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div> */}
      <div className="grey-text text-darken-2" style={{marginTop: "10px"}}>
        {/* <Timer>
          <Timer.Hours />{` hours `} 
          <Timer.Minutes />{` minutes `}  
          <Timer.Seconds />{` seconds `}  
        </Timer> */}
      </div>
      </div>
      {/* <h3>Remote Participants</h3> */}
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
