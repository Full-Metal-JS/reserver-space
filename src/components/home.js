import React from 'react';
import {Link} from 'react-router';
import Navbar from './navbar';

export default Home = ({childern}) => {
  return (
    <div>
      <Navbar />
      <div className='jumbotron text-center'>
        <h1>Find Your Space</h1>
        {childern}
      </div>
    </div>
  )
}
