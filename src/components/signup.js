import React from 'react';
import {Link} from 'react-router';

export default Signup = ({addFirstName, addLastName, addEmail, addPassword, postSignup, userFirstName, userLastName, userEmail, userPassword}) => {
  handleSubmit(e){
    e.preventDefault();
    let user = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword
    };
    postSignup(user);
  }

  return(
    <div className='container'>
        <div>
          <h2>Sign Up</h2>
          <h3><Link to={'/login'}>Log in here</Link></h3>
        </div>
        <div>
          <div className='facebook-auth'>
            <a href='/auth/facebook' className='btn btn-facebook'>Sign up with Facebook</a>
          </div>
          <div className='google-auth'>
            <a href='/auth/google' className='btn btn-google'>Sign up with Google</a>
          </div>
        </div>
      <form>
        <h3>Or sign up with email</h3>
        <input type='email' placeholder='Your Email' onBlur={(e) => {addEmail(e.target.value)}} />
        <input type='password' placeholder='Password' onBlue={(e) => {addPassword(e.target.value)}} />
        <button className='btn btn-primary btn-block' onClick={this.handleSubmit.bind(this)}>Sign Up</button>
      </form>
    </div>
  )
}
