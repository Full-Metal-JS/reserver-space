import React from 'react';
import {Link} from 'react-router';

const Login = ({addEmail, addPassword, postLogin, userEmail, userPassword}) => {

  return(
    <div className='container'>
        <div>
          <h2>Log In</h2>
          <h3><Link to={'/signup'}>Sign up here</Link></h3>
        </div>
        <div>
          <div className='facebook-auth'>
            <a href='/auth/facebook' className='btn btn-facebook'>Log in with Facebook</a>
          </div>
          <div className='google-auth'>
            <a href='/auth/google' className='btn btn-google'>Log in with Google</a>
          </div>
        </div>
      <form>
        <h3>Or log in with email</h3>
        <input type='email' placeholder='Your Email' onBlur={(e) => {addEmail(e.target.value)}} />
        <input type='password' placeholder='Password' onBlue={(e) => {addPassword(e.target.value)}} />
        <button className='btn btn-primary btn-block' onClick={postLogin({email: userEmail, password: userPassword})}>Log In</button>
      </form>
    </div>
  )
}

export default Login;
