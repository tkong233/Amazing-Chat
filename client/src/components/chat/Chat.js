import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendMessage, uploadChatFiles, initiateVideoCall, pickUpVideoCall,
  hangUpVideoCall, waitForVideoCallDecision } from '../../actions/chatActions';
import Dropzone from 'react-dropzone';
import Messages from './Messages';
import VideoCall from './VideoCall';
import './Chat.css';

const Chat = (props) => {
  const { messages, socket, pairId, sender, receiver, receiverName } = props.chat;
  const { name, email } = props.user;

  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    
    if (socket && message && pairId && receiver) {
      // console.log('sending message: ' + message);
      const data = {
        pairId,
        from: sender,
        to: receiver,
        message,
        type: "text"
      };
      props.sendMessage(data, socket);
      setMessage('');
    }
  }

  const [errorUpload, setErrorUpload] = useState('');
  const onDrop = async (files) =>{
    setErrorUpload('')
    const file_size = files[0].size; //byte 
    if (file_size <= 11000000){
      const formData = new FormData();
      const { pairId, socket, sender, receiver } = props.chat;
      formData.append("NonTextfile", files[0]);
      formData.append("pairId", pairId);
      formData.append("from", sender);
      formData.append("to", receiver);
      formData.append("type", "ImageOrVideoOrAudio");
      await props.uploadChatFiles(formData, socket);
    }else{
      setErrorUpload('File too large, maximum size 11M')
    }
  }

  const initiateVideoCall = () => {
    // console.log("initiating video call");
    props.initiateVideoCall(
      pairId,
      sender,
      receiver,
      socket
    );
    props.waitForVideoCallDecision(socket);
  }

  const handleAcceptVideoCall = () => {
    props.pickUpVideoCall(socket, pairId, sender, receiver);
  }

  const handleRejectVideoCall = () => {
    props.hangUpVideoCall(socket, pairId, sender, receiver);
  }

  const { ringing, calling, waiting } = props.chat;
  // console.log(ringing, calling);
  // console.log(props.chat);
  if (socket && !calling) {
    return (
      // Video Call Dialog
      <div className='chat-container' data-test="ChatComponent">
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
          <Button onClick={handleAcceptVideoCall} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* Waiting for Response Window */}
      <Dialog
        open={waiting}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Waiting for ${receiverName} to respond...`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleRejectVideoCall} color="primary">
            Hang Up
          </Button>
        </DialogActions>
      </Dialog>
      {/* Messages */}
        <Messages/>

      {/* Chat Input */}
        <div className="chat-input-bar">
          <input
            id="message-input"
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
          />
          <label htmlFor="message-input">type a message...</label>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />                   
                        <Button 
                        variant="contained" 
                        color='primary' 
                        component="span"
                        size="small">
                          Upload
                        </Button>
                    </div>
                </section>
            )}
        </Dropzone>
        <VideoCallIcon
          style={{fontSize: 50, marginTop: '3px'}}
          onClick={initiateVideoCall}
        />
        <div> {errorUpload} </div>
        </div>
      </div>
    )
  } else if (socket && calling) {
    return <VideoCall/>
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  {
    sendMessage,
    uploadChatFiles,
    initiateVideoCall,
    pickUpVideoCall,
    hangUpVideoCall,
    waitForVideoCallDecision,
  }
)(Chat);