import React from 'react';
import './Message.css';

import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';


class Message extends React.Component {
  render() {
    const { text, sender, user } = this.props;
    const position = (sender === user) ? 'right' : 'left';
    const type = 'text';

    return (
      <div data-test = "MessageComponent">
      <MessageBox
          className="message-bubble"
          position={position}
          type={type}
          text={text}
        />
      </div>
    );
  }
}

export default Message;