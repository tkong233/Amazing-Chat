import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import Join from './Join';
import './Chat.css';

let socket;

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

  // componentDidMount() {

  // }

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
    const ENDPOINT = 'localhost:5000/';

    socket = io(ENDPOINT);
    // console.log(socket);

    socket.emit('join', data);

    // console.log(this.props.location.search);
    // ?name=thisname&room=thisroom

    socket.on('receiveMessage', ({text, user}) => {
      // console.log(text, user);
      this.addMessageToList(text, user);
    });

    this.setState({joined: true});
};


  render() {
    // console.log(this.state);
    return (
      <div data-test="ChatComponent">
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

// const Chat = () => {
//   return (
//     <h1>Chat</h1>
//   )
// }

export default Chat;