import React from 'react';
import {Link} from 'react-router';

const Signup = ({addFirstName, addLastName, addEmail, addPassword, postSignup, userFirstName, userLastName, userEmail, userPassword}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    postSignup({
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword
    });
  };
  
  return (
    <div className='container authContainer'>
        <div className='text-center'>
          <h2>Sign Up</h2>
          <h3><Link to={'/login'}>Log in here</Link></h3>
        </div>
        <div>
          <div className='facebook-auth'>
            <a href='/auth/facebook' className='btn btn-primary btn-facebook'>Sign up with Facebook</a>
          </div>
          <div className='google-auth'>
            <a href='/auth/google' className='btn btn-primary btn-google'>Sign up with Google</a>
          </div>
        </div>
      <form>
        <h3>Or sign up with email</h3>
        <div className='col-sm-12'>
          <input type='email' placeholder='Your Email' onBlur={(e) => {addEmail(e.target.value)}} />
        </div>
        <div className='col-sm-12'>
          <input type='password' placeholder='Password' onBlur={(e) => {addPassword(e.target.value)}} />
        </div>
        <button className='btn btn-primary btn-block'
          onClick={handleSubmit.bind(this)}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;