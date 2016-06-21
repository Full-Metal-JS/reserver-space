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
    <div className='container authContainer text-center'>
      <h2 className='auth'>Sign Up</h2>
      <div>
        <div className='facebook-auth'>
          <a href='/auth/facebook' className='btn btn-primary btn-facebook'><i className='fa fa-facebook-official'></i>Sign up with Facebook</a>
        </div>
        <div className='google-auth'>
          <a href='/auth/google' className='btn btn-primary btn-google'><i className='fa fa-google'></i>Sign up with Google</a>
        </div>
      </div>
      <form>
        <p>Or sign up with email</p>
        <div className='authInput'>
          <input id='nameInput' type='text' placeholder='First Name' onBlur={(e) => {addFirstName(e.target.value)}}/>
          <input id='nameInput' type='text' placeholder='Last Name' onBlur={(e) => {addLastName(e.target.value)}}/>
        </div>
        <div className='authInput'>
          <input type='email' placeholder='Email' onBlur={(e) => {addEmail(e.target.value)}} />
        </div>
        <div className='authInput'>
          <input type='password' placeholder='Password' onBlur={(e) => {addPassword(e.target.value)}} />
        </div>
        <button className='btn btn-primary btn-auth'
          onClick={handleSubmit.bind(this)}>Sign Up</button>
      </form>
      <div className='authLink'>
        <h4><Link to={'/login'}>Log in here</Link></h4>
      </div>
    </div>
  );
};

export default Signup;
