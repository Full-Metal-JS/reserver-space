import React from 'react';
import {Link} from 'react-router';
import Navbar from './navbar';

const Home = ({childern, userAuthenticated, submitLogout}) => {
  return (
    <div>
      <Navbar userAuthenticated={userAuthenticated} submitLogout={submitLogout}/>
      <div className='jumbotron text-center'>
        <h1>Find Your Space</h1>
        {childern}
      </div>
    </div>
  )
}

export default Home;
