import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';
import './Messages.css';

class Messages extends React.Component {
  render() {
    const { messages, user } = this.props;
    return (
      // TODO: check wether the message is sent by the user
      // render as sended or received
      <div className="container">
      <div>
      <ScrollToBottom>
        {messages.map((m) => 
          <Message
            text={m.text}
            sender={m.sender}
            user={user}
          />
        )}
      </ScrollToBottom>
      </div>
      </div>
    )
  }
}

export default Messages;