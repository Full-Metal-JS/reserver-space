import React from 'react';
import {Link} from 'react-router';
import Navbar from './navbar';
import LoginContainer from '../containers/loginContainer';

const Home = ({children, userAuthenticated, submitLogout}) => {
  return (
    <div>
      <Navbar userAuthenticated={userAuthenticated} submitLogout={submitLogout}/>
      <div className='jumbotron text-center'>
        <h1>Find Your Space</h1>
        <LoginContainer/>
      </div>
    </div>
  )
}

export default Home;
