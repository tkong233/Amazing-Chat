import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      // TODO: check wether the message is sent by the user
      // render as sended or received
      <ScrollToBottom>
        {messages.map((m) => <Message text={m.text} user={m.user}/>)}
      </ScrollToBottom>
    )
  }
}

export default Messages;