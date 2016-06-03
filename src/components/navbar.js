import React from 'react';
import {Link} from 'react-router';
import iconFile from '../public/img/reserver-logo360x360.png';

const NavBar = ({userAuthenticated, submitLogout}) => {
  let icon = (<span><img className='logo' src={iconFile} width='40' height='40'/>Reserver.Space</span>);
  if (userAuthenticated){
    return (
    <navbar>
      <div className='navbar navbar-inverse navbar-fixed-top'>
        <div className='contianer-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>{icon}</Link>
          </div>
          <div className='navbar navbar-nav navbar-right'>
            <button className='btn btn-logout' onClick={submitLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </navbar>
    )
  } else {
    return(
    <navbar>
      <div className='navbar navbar-inverse navbar-fixed-top'>
        <div className='contianer-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>{icon}</Link>
          </div>
        </div>
      </div>
    </navbar>
    )
  }
}

export default NavBar;