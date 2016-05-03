import React from 'react';
import {Link} from 'react-router';

const NavBar = ({userAuthenticated, submitLogout}) => {
  if (userAuthenticated){
    return (
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='contianer-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>Reserver.Space</Link>
        </div>
        <div className='navbar navbar-nav navbar-right'>
          <button className='btn btn-logout' onClick={submitLogout}>Log Out</button>
        </div>
      </div>
    </nav>
    )
  } else {
    return(
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='contianer-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>Reserver.Space</Link>
        </div>
      </div>
    </nav>
    )
  }
}

export default NavBar;