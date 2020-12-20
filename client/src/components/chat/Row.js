import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const LOADING = 1;
const LOADED = 2;

const Row = (props) => {
  const { index, style } = props;
  const { itemStatusMap, messages, sender } = props.chat;
  let label;
  console.log('itemStatusMap', itemStatusMap);
  if (itemStatusMap[index] === LOADED) {
    // label = `Row ${index}`;
    const message = messages[index];
    label = (<Message
              text={message.message}
              sender={message.from}
              user={sender}
              from={message.from}
              to={message.to}
              message={message.message}
              datetime={message.datetime}
              pairId={message.pairId}
            />)
  } else if (itemStatusMap[index] === LOADING) {
    // console.log(index, itemStatusMap[index]);
    label = "Loading...";
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
}

const mapStateToProps = state => ({
  chat: state.chat,
})

export default connect(
  mapStateToProps,
  {}
)(Row);