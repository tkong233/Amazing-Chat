import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';

let socket;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'Bob',
      message: '',
      messages: [],
      room: 'testRoom',
    }
  }

  componentDidMount() {
    const ENDPOINT = 'localhost:5000/';
    socket = io(ENDPOINT);
    console.log(socket);

    socket.emit('join', { name: 'testUser', room: 'testRoom' });

    // console.log(this.props.location.search);
    // ?name=thisname&room=thisroom

    socket.on('receiveMessage', ({text, user}) => {
      console.log(text, user);
      this.addMessageToList(text, user);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  setMessage = (message) => {
    this.setState({message});
  }

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
    messageList.push({text: message, user});
    this.setState({messages: messageList});
  }

  render() {

    return (
      <div>
        <h1>Chat</h1>
        <Messages messages={this.state.messages}/>
        <div>
          <input
            type='text'
            value={this.state.message}
            onChange={(event) => this.setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? this.sendMessage(event) : null}
          />
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