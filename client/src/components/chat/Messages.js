import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import { FixedSizeList as List } from 'react-window'; // un-comment this for infinite-scroll
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { setItemStatus } from '../../actions/chatActions';

import Message from './Message';
import Row from './Row';
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

const LOADING = 1;
const LOADED = 2;

const Messages = (props) => {
  const classes = useStyles();
  const { messages, sender, receiver, itemStatusMap } = props.chat;
  const className = 'messages-container ' + classes.root;
  // const { text, sender, user, from, to, pairId, datetime, message } = props;

  const isItemLoaded = index => itemStatusMap[index];
  const loadMoreItems = (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      if (index) {
        props.setItemStatus(index, LOADING);
      }
    }
    return new Promise(resolve =>
      setTimeout(() => {
        for (let index = startIndex; index <= stopIndex; index++) {
          if (index) {
            props.setItemStatus(index, LOADED)
          }
        }
        resolve();
      }, 3000)
    );
  };

  // for non-infinite-scroll only
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
    <div className="message-holder"> 

    {/* Temp version without infinite scroll */}
    <div className={className} data-test="MessagesComponent"></div>
    <FixedSizeList height={500} width={'100%'} itemSize={46} itemCount={1}>
      {renderMessages}
    </FixedSizeList>

    {/* Infinite Scroll */}

    {/* <div className={className} data-test="MessagesComponent">
    <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={messages.length}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={650}
            itemCount={messages.length}
            itemSize={46}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={'100%'}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </div> */}


    </div>
  )
}

const mapStateToProps = state => ({
  chat: state.chat,
})

export default connect(
  mapStateToProps,
  {
    setItemStatus
  }
)(Messages);
