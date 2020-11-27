import React from "react";
import Box from '@material-ui/core/Box';

import ContactSideBar from '../contacts/ContactSideBar';
import Chat from '../chat/Chat';

import './Dashboard.css'

const Dashboard = (props) => {
  return (
    <div className='dashboard' data-test="DashboardComponent">
      <Box display='flex'>
        <Box>
          <ContactSideBar className='side-bar'/>
        </Box>
        <Box flexGrow={1}>
          <Chat className='chat'/>
        </Box>
      </Box>
    </div>
  );
}


export default Dashboard;
