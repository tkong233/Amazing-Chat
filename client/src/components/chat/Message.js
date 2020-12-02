import React from 'react';
import './Message.css';

import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const Message = (props) => {
  const { text, sender, user, type } = props;
  const position = (sender === user) ? 'right' : 'left';
  
  console.log(props.text);
  return (
    props.text.substring(0, 8) === "uploads/"?
    props.text.substring(props.text.length - 3, props.text.length) === 'mp4'?
    <MessageBox
      className="message-bubble"
      position={position}
      type={"video"}
      data={{
        // uri: `${props.text}`
        // uri: `uploads/sample-mp4-file.mp4`
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4'
      }}
    />
    :
    <MessageBox
      className="message-bubble"
      position={position}
      type={"photo"}
      data={{
        uri: `${props.text}`
      }}
    />
  :
      <MessageBox
        className="message-bubble"
        position={position}
        type={type}
        text={text}
      />
  );
}

export default Message;