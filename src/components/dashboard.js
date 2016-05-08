import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Dashboard = ({childern, userAuthenticated, submitLogout}) => {
  return (
    <Navbar userAuthenticated={userAuthenticated} submitLogout={submitLogout}/>
    <div className='container'>
      <Sidebar />
      {childern}
    </div>
  )
};

export default Dashboard;
