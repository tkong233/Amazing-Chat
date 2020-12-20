import React from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import "./Chat.css";

import Message from './Message';
import './Messages.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    maxHeight: '80%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, sender, receiver } = props.chat;
  const className = 'messages-container ' + classes.root;
  // const { text, sender, user, from, to, pairId, datetime, message } = props;
  const renderMessages = () => {
    // console.log(messages);
    return (
      messages.map((m) => 
        <Message
          text={m.message}
          sender={m.from}
          receiver={m.to}
          user={sender}
          type={m.type}
          datetime={m.datetime}
          from={m.from} // sender
          to={m.to} // receiver
          message={m.message}
          pairId={m.pairId}
        />
      )
    )
  }



  return (
    // TODO: check wether the message is sent by the user
    // render as sended or received
    <div className="message-holder"> 
    <div className={className} data-test="MessagesComponent">
    <FixedSizeList height={500} width={'100%'} itemSize={46} itemCount={1}>
      {renderMessages}
    </FixedSizeList>
    </div>
    </div>
  )
}

const mapStateToProps = state => ({
  chat: state.chat,
})

export default connect(
  mapStateToProps,
  {

  }
)(Messages);
