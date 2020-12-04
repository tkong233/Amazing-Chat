import React from 'react';
import './Message.css';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const Message = (props) => {
  const { text, sender, user, type } = props;
  console.log(props)
  const position = (sender === user) ? 'right' : 'left';

  if (props.text.substring(0, 8) === "uploads/"){
    const file_ext = props.text.substring(props.text.length - 3, props.text.length);
      if ( file_ext === 'mp4' || file_ext === 'webm' || file_ext === 'avi' || file_ext === 'mov'){
        return (
          <div>
            <video
            style={{ maxWidth: '500px' }}
            src={`${props.text}`} alt="video"
            type="video/mp4" controls
          />
          </div>
        );
      }else if (file_ext === 'mp3' || file_ext === 'wav' || file_ext === 'ogg'){
        return(
          <div>
            <audio
            src={`${props.text}`} alt="audio"
            type="audio/ogg" controls
          />
          </div> 
        );
      }else if(file_ext === 'png' || file_ext === 'jpg'){
        return(
          <MessageBox
          className="message-bubble"
          position={position}
          type={"photo"}
          data={{
            uri: `${props.text}`,
          }}
        />
        );
      }else{
        return(
          <MessageBox
            className="message-bubble"
            position={position}
            type={"text"}
            text={props.text}
          />
        )
      }
  }else{
    return(
      <MessageBox
        className="message-bubble"
        position={position}
        type={type}
        text={text}
      />
    );
  }
}

export default Message;