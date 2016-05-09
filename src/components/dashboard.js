import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Dashboard = ({childern, userAuthenticated, submitLogout}) => {
  return (
    <div>
      <Navbar userAuthenticated={userAuthenticated} submitLogout={submitLogout}/>
      <div className='container'>
      <Sidebar />
      {childern}
      </div>
    </div>
  )
};

export default Dashboard;
