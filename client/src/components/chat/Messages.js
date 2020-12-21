import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import { FixedSizeList as List } from 'react-window'; // un-comment this for infinite-scroll
// import { FixedSizeList } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";
import { setItemStatus } from "../../actions/chatActions";
// import { MessageList } from "react-chat-elements";
// import { Virtuoso } from "react-virtuoso";
import InfiniteScroll from "react-infinite-scroll-component";

import Message from "./Message";
import Row from "./Row";
import "./Messages.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxHeight: "80%",
    marginTop: "5%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, sender, receiver, itemStatusMap } = props.chat;
  const className = "messages-container " + classes.root;

  // for non-infinite-scroll only
  const renderMessages = () => {
    // console.log(messages);
    return messages.map((m) => (
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
    )).reverse();
  };

  const intervals = 15;
  const timeLoading = 2000;

  const [items, setItems] = useState("");
  const [index, setIndex] = useState(intervals);
  const [hasMore, setHasMore] = useState(false);


  useEffect (() => {
    if (renderMessages().length > 0) {
      setItems(renderMessages().slice(0, 15));
      setIndex(intervals);
      setHasMore(true);
    } else {
      setItems("");
    }
  },[props])

  const fetchMoreData = () => {
    console.log("fetching more data");
    const messagesLength = messages.length;
    if (items.length < messagesLength - intervals) {
      setTimeout(() => {
        setItems(items.concat(renderMessages().slice(index, index + intervals)));
        // console.log(renderMessages().slice(index, index + 10));
        // console.log(items);
        setIndex(index + intervals);
      }, timeLoading);
    } else {
      setTimeout(() => {
        setItems(items.concat(renderMessages().slice(index, renderMessages().length)));
        setIndex(intervals);
      }, timeLoading);
      setHasMore(false);
    }
  };

  return (
    <div className="message-holder">
      <div className={className} data-test="MessagesComponent">
      <div
          id="scrollableDiv"
          style={{
            height: 500,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {/*Put the scroll bar always on the bottom*/}
          {items &&<InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            inverse={true}
            hasMore={hasMore}
            loader={<h5 className="blue-grey-text text-darken-2" style={{textAlign: "center"}}><i class="fas fa-spinner"></i> Loading...</h5>}
            scrollableTarget="scrollableDiv"
          >
            {items.map((_, index) => (
              items[index]
            ))}
          </InfiniteScroll>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, {
  setItemStatus,
})(Messages);
