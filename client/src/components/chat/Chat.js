import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import Join from './Join';
import './Chat.css';

let socket;
const ENDPOINT = 'localhost:5000/';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      message: '',
      messages: [],
      room: '',
      
      // for testing only
      joined: false,
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.disconnect();
    }
  }

  setMessage = (message) => {
    this.setState({message});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  sendMessage = (event) => {
    console.log('sending message');
    event.preventDefault();
    const {message, room, username} = this.state;
    if (message && room) {
      socket.emit('sendMessage', { message, room, username }, this.message);
      this.setMessage('');
    }
  }

  addMessageToList = (message, user) => {
    let messageList = this.state.messages;
    messageList.push({text: message, sender: user});
    this.setState({messages: messageList});
  }

  onSubmit = e => {
    e.preventDefault();

    const { username, room } = this.state;
    const data = {
      name : username,
      room,
    };
    socket = io(ENDPOINT);
    socket.emit('join', data);
    socket.on('receiveMessage', ({text, user}) => {
      this.addMessageToList(text, user);
    });

    this.setState({joined: true});
};


  render() {
    return (
      <div className='chat-container' data-test="ChatComponent">
        {/* for testing only */}
        {this.state.joined ? null :
          <Join
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            username={this.state.username}
            room={this.state.room}
        />}

        <Messages
          user={this.state.username}
          messages={this.state.messages}
        />
        <div className="chat-input-bar">
          <input
            id="message-input"
            type='text'
            value={this.state.message}
            onChange={(event) => this.setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? this.sendMessage(event) : null}
          />
          <label htmlFor="message-input">type a message...</label>
        </div>
      </div>
    );
  }
}

export default Chat;