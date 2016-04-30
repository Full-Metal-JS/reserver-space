import React from 'react';
import {Link} from 'react-router';

export default Login = ({addEmail, addPassword, postLogin, userEmail, userPassword}) => {
  handleSubmit(e){
    e.preventDefault();
    let user = {
      email: userEmail,
      password: userPassword
    };
    postLogin(user);
  }

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
        <button className='btn btn-primary btn-block' onClick={this.handleSubmit.bind(this)}>Log In</button>
      </form>
    </div>
  )
}
