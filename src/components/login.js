import React from 'react';
import {Link} from 'react-router';

const Login = ({addEmail, addPassword, postLogin, userEmail, userPassword}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin({email: userEmail, password: userPassword});
  };

  return(
    <div className='container authContainer text-center'>
        <h2 className='auth'>Log In</h2>
        <div>
          <div className='facebook-auth'>
            <a href='/auth/facebook' className='btn btn-primary btn-facebook'><i className='fa fa-facebook-official'></i> Log in with Facebook</a>
          </div>
          <div className='google-auth'>
            <a href='/auth/google' className='btn btn-primary btn-google'><i className='fa fa-google'></i> Log in with Google</a>
          </div>
        </div>
      <form>
        <p>Or log in with email</p>
        <div className='authInput'>
          <input type='email' placeholder='Email' onBlur={(e) => {addEmail(e.target.value)}} />
        </div>
        <div className='authInput'>
          <input type='password' placeholder='Password' onBlur={(e) => {addPassword(e.target.value)}} />
        </div>
        <button className='btn btn-primary btn-auth' onClick={handleSubmit.bind(this)}>Log In</button>
      </form>
      <div className='authLink'>
        <h4><Link to={'/signup'}>Sign up here</Link></h4>
      </div>
    </div>
  )
}

export default Login;
