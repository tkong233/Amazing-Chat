import React, { useState } from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../../actions/chatActions';

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
      };
      props.sendMessage(data, socket);
      setMessage('');
    }
  }

  console.log('socket in state', socket);

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
  }
)(Chat);