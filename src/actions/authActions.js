import * as actions from './actionConstants';
import { browserHistory } from 'react-router';
import { login, signup } from '../helpers/api';

export const addEmail = email => ({
  type: actions.ADD_EMAIL,
  email
});

export const addPassword = (password) => ({
  type: actions.ADD_PASSWORD,
  password
});

export const submitLogin = () => ({
  type: actions.LOGIN_SUBMIT
});

export const loginSuccess = (user) => {
  browserHistory.push('/dashboard');
  return {
    type: actions.LOGIN_SUCCESS,
    user
  };
};

export const loginFailure = (error) => ({
  type: actions.LOGIN_FAILURE,
  error
});

export const postLogin = (user) => (dispatch, getState) => {
  let state = getState();
  if(!state.postingLogin){
    dispatch(submitLogin());
    login(user)
    .then(data => dispatch(loginSuccess(data)))
    .catch(err => dispatch(loginFailure(err)));
  }
};

export const addSignupFirstName = (firstName) => ({
  type: actions.SIGNUP_FIRST_NAME,
  firstName
});

export const addSignupLastName = (lastName) => ({
  type: actions.SIGNUP_LAST_NAME,
  lastName
});

export const submitSignup = () => ({
  type: actions.SIGNUP_SUBMIT
});

export const signupSuccess = (user) => {
  browserHistory.push('/dashboard');
  return {
    type: actions.SIGNUP_SUCCESS,
    user
  };
};

export const signupFailure = (error) => ({
  type: actions.SIGNUP_FAILURE,
  error
});

export const postSignup = (user) => (dispatch, getState) => {
  let state = getState();
  if(!state.postingSignup){
    dispatch(submitSignup());
    signup(user)
    .then(data => dispatch(signupSuccess(data)))
    .catch(err => dispatch(signupFailure(err)));
  }
};

export const submitLogout = () => ({
  type: actions.LOGOUT_SUBMIT
});

export const logoutSuccess = () => ({
  type: actions.LOGOUT_SUCCESS
});

export const logoutFailure = (error) => ({
  type: actions.LOGOUT_FAILURE,
  error
});

export const postLogout = () => (dispatch) => {
  dispatch(submitLogout());
  fetch('/auth/logout', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    dispatch(logoutSuccess());
  })
  .catch(err => dispatch(logoutFailure(err)));
};
