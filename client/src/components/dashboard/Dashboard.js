import React from "react";
import ContactSideBar from '../contacts/ContactSideBar';

const Dashboard = (props) => {
  return (
    <div data-test = "DashboardComponent">
      <ContactSideBar/>
    </div>
  );
}


export default Dashboard;
