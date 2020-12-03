import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { sendMessage, uploadChatFiles } from '../../actions/chatActions';
import Dropzone from 'react-dropzone';
import Messages from './Messages';
import './Chat.css';

const Chat = (props) => {
  const { messages, socket } = props.chat;
  const { name, email } = props.user;

  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    const { pairId, socket, sender, receiver } = props.chat;
    if (socket && message && pairId && receiver) {
      console.log('sending message: ' + message);
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
      formData.append("file", files[0]);
      formData.append("pairId", pairId);
      formData.append("from", sender);
      formData.append("to", receiver);
      formData.append("type", "ImageOrVideoOrAudio");
      await props.uploadChatFiles(formData, socket);
    }else{
      setErrorUpload('File too large, maximum size 11M')
    }
  }

  return (socket) ? (
    <div className='chat-container' data-test="ChatComponent">
      <Messages/>
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
      <div> {errorUpload} </div>
      </div>
    </div>
  ) : null;
}


const mapStateToProps = state => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  {
    sendMessage,
    uploadChatFiles
  }
)(Chat);