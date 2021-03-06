import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  sendMessage,
  uploadChatFiles,
  initiateVideoCall,
  pickUpVideoCall,
  hangUpVideoCall,
  waitForVideoCallDecision,
  setCalleeOnline,
  stopWaiting,
  resetVideoCallRejected,
} from "../../actions/chatActions";
import Dropzone from "react-dropzone";
import Messages from "./Messages";
import VideoCall from "./VideoCall";
import "./Chat.css";

const Chat = (props) => {
  const {
    messages,
    socket,
    pairId,
    sender,
    receiver,
    receiverName,
  } = props.chat;

  const { name, email } = props.user;

  const { ringing, calling, waiting, rejected, calleeOnline } = props.chat;
  console.log(
    "ringing",
    ringing,
    "calling",
    calling,
    "waiting",
    waiting,
    "calleeOnline",
    calleeOnline
  );

  const [message, setMessage] = useState("");
  const audio = new Audio('https://quz1yp-a.akamaihd.net/downloads/ringtones/files/mp3/huawei-tone-toneswall-com-52227.mp3');
  
  if (ringing) {
    console.log('audio play');
    audio.play();
  } else {
    console.log('audio pause');
    audio.pause();
  }

  audio.addEventListener('ended', function () {
    if (ringing) {
      console.log('audio loop');
      this.currentTime = 0;
      this.play();
    }
  }, true);

  const sendMessage = (e) => {
    e.preventDefault();

    if (socket && message && pairId && receiver) {
      const data = {
        pairId,
        from: sender,
        to: receiver,
        message,
        type: "text",
      };
      props.sendMessage(data, socket);
      setMessage("");
    }
  };

  const [errorUpload, setErrorUpload] = useState("");
  const onDrop = async (files) => {
    setErrorUpload("");
    const file_size = files[0].size; //byte
    if (file_size <= 11000000) {
      const formData = new FormData();
      const { pairId, socket, sender, receiver } = props.chat;
      formData.append("NonTextfile", files[0]);
      formData.append("pairId", pairId);
      formData.append("from", sender);
      formData.append("to", receiver);
      formData.append("type", "ImageOrVideoOrAudio");
      await props.uploadChatFiles(formData, socket);
    } else {
      setErrorUpload("File too large, maximum size 11M");
    }
  };

  const initiateVideoCall = () => {
    props.initiateVideoCall(pairId, sender, receiver, false, socket);
    props.waitForVideoCallDecision(socket);
  };

  const handleCallerHangCall = () => {
    props.initiateVideoCall(pairId, sender, receiver, true, socket);
    props.stopWaiting(socket);
    props.resetVideoCallRejected();
  }

  const handleAcceptVideoCall = () => {
    props.pickUpVideoCall(socket, pairId, sender, receiver);
    if (audio) {
      audio.pause();
    }
  };

  const handleRejectVideoCall = () => {
    props.hangUpVideoCall(socket, pairId, sender, receiver);
    props.stopWaiting(socket);
    if (audio) {
      audio.pause();
    }
  };

  const handleCalleeOffline = () => {
    props.setCalleeOnline();
    props.stopWaiting(socket);
  };

  const handleResetRejected = () => {
    props.resetVideoCallRejected();
    props.stopWaiting(socket);
  }
  
  if (socket && !calling) {
    return (
      // Video Call Dialog
      <div className="chat-container" data-test="ChatComponent">
        {/* Receive Call Window */}
        <Dialog
          open={ringing}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`${receiverName} invited you to a video call`}</DialogTitle>
          <DialogActions>
            <Button onClick={handleRejectVideoCall} color="primary">
              Reject
            </Button>
            <Button onClick={handleAcceptVideoCall} style={{color: "white", backgroundColor: "CornflowerBlue"}} autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>

        {/* Waiting for Response Window */}
        <Dialog
          open={waiting && calleeOnline}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Waiting for ${receiverName} to respond...`}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCallerHangCall} color="primary">
              Hang Up
            </Button>
          </DialogActions>
        </Dialog>

        {/* On Callee Offline */}
        <Dialog
          open={!calleeOnline}
          onClose={handleCalleeOffline}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`${receiverName} is not online`}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCalleeOffline} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* On Call Rejected */}
        <Dialog
          open={rejected}
          onClose={handleResetRejected}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`${receiverName} rejected your call`}</DialogTitle>
          <DialogActions>
            <Button onClick={handleResetRejected} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Messages */}
        <Messages />

        {/* Chat Input */}
        <div className="chat-input-bar" style={{}}>
          <div>
            <input
              id="message-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
            <label htmlFor="message-input">type a message ???</label>
          </div>
          <div style={{display: "flex"}}>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button
                      style={{ color: "white", backgroundColor: "#455a64", marginTop: "7px" }}
                      variant="contained"
                      component="span"
                      size="small"
                    >
                      Send Files (Image, Audio, Video)
                    </Button>
                  </div>
                </section>
              )}
            </Dropzone>
            {/* <VideoCallIcon
            style={{ fontSize: 50, marginTop: "3px" }}
            onClick={initiateVideoCall}
          /> */}
            <div>
              <Button
                // variant="contained"
                // component="span"
                // size="large"
                onClick={initiateVideoCall}
                style={{ color: "CornflowerBlue", backgroundColor: "transparent", marginTop: "2px" }}
              >
                <i class="fas fa-video fa-2x"></i>
              </Button>
            </div>
            <div style={{marginTop: "10px"}} className= "blue-grey-text text-darken-2"> {errorUpload} </div>
          </div>
        </div>
      </div>
    );
  } else if (socket && calling) {
    return <VideoCall />;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  sendMessage,
  uploadChatFiles,
  initiateVideoCall,
  pickUpVideoCall,
  hangUpVideoCall,
  waitForVideoCallDecision,
  setCalleeOnline,
  stopWaiting,
  resetVideoCallRejected
})(Chat);
