import React from 'react';
import './Message.css';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const Message = (props) => {
  const { text, sender, user, type } = props;
  const position = (sender === user) ? 'right' : 'left';
  const style = (position === 'left') ? {textAlign: 'left'} : {textAlign:"right"}

  if (props.text.substring(0, 45) === "https://cis557-amazing-chat.s3.amazonaws.com/"|| "uploads/"){
    const file_ext = props.text.substring(props.text.length - 3, props.text.length);
      if ( file_ext === 'mp4' || file_ext === 'webm' || file_ext === 'avi' || file_ext === 'mov'){
        return (
          <div style={style}>
            <video
            style={{ maxWidth: '500px' }}
            src={`${props.text}`} alt="video"
            type="video/mp4" controls
          />
          </div>
        );
      }else if (file_ext === 'mp3' || file_ext === 'wav' || file_ext === 'ogg'){
        return(
          <div style={style}>
            <audio
            src={`${props.text}`} alt="audio"
            type="audio/ogg" controls
          />
          </div> 
        );
      }else if(file_ext === 'png' || file_ext === 'jpg'){
        return(
          <div>
            <MessageBox
            className="message-bubble"
            position={position}
            type={"photo"}
            data={{
              uri: `${props.text}`,
            }}
          />
          </div>
        );
      }else{
        return(
          <div>
            <MessageBox
            className="message-bubble"
            position={position}
            type={"text"}
            text={props.text}
          />
          </div>
        )
      }
  }else{
    return(
      <div data-test='MessageComponent'>
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