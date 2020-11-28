import React from 'react';
import './Message.css';

import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';


const Message = (props) => {
  const { text, sender, user } = props;
  const position = (sender === user) ? 'right' : 'left';
  const type = 'text';
  
  return (
      <MessageBox
        className="message-bubble"
        position={position}
        type={type}
        text={text}
      />
  );
}

export default Message;