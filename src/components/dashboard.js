import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Dashboard = ({children, userAuthenticated, submitLogout}) => {
  return (
    <div>
      <Navbar userAuthenticated={userAuthenticated} submitLogout={submitLogout}/>
      <div className='container'>
      <Sidebar />
      {children}
      </div>
    </div>
  )
};

export default Dashboard;
