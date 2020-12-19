import React from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

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

  const renderMessages = () => {
    console.log(messages);
    return (
      messages.map((m) => 
        <Message
          text={m.message}
          sender={m.from}
          user={sender}
          type={m.type}
          date={m.datetime}
        />
      )
    )
  }



  return (
    // TODO: check wether the message is sent by the user
    // render as sended or received
    <div className={className} data-test="MessagesComponent">
    <FixedSizeList height={650} width={'100%'} itemSize={46} itemCount={1}>
      {renderMessages}
    </FixedSizeList>
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
