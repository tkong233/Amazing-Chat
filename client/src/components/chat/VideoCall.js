import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { hangUpVideoCall } from '../../actions/chatActions';

const VideoCall = (props) => {
  const { pairId, socket, sender, receiver } = props.chat;
  return (
    <div style={{ marginLeft: '3%', marginRight: '3%' }}>
      <h3>This is video call view</h3>
      <Button
        variant="contained" color="secondary"
        onClick={() => { props.hangUpVideoCall(socket, pairId, sender, receiver) }}
      >
        Hang Up
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  {
    hangUpVideoCall,
  }
)(VideoCall);