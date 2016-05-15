import * as actions from './actionConstants';
import {browserHistory} from 'react-router';

export const addEmail = (email) => {
  return {
    type: actions.ADD_EMAIL,
    email
  }
};

export const addPassword = (password) => {
  return {
    type: actions.ADD_PASSWORD,
    password
  }
};

export const submitLogin = () => {
  return {
    type: actions.LOGIN_SUBMIT
  }
}

export const loginSuccess = (user) => {
  browserHistory.push('/dashboard');
  return {
    type: actions.LOGIN_SUCCESS,
    user
  }
};

export const loginFailure = (error) => {
  return {
    type: actions.LOGIN_FAILURE,
    error
  }
};

export const postLogin = (user) => {
  return (dispatch, getState) => {
    let state = getState();
    if(!state.postingLogin){
      dispatch(submitLogin());
      fetch('/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300){
          dispatch(loginSuccess(response.user));
        }
        else {
          let error = new Error(response.statusText);
          dispatch(loginFailure(error));
        }
      })
    }
  }
}

export const addSignupFirstName = (firstName) => {
  return {
    type: actions.SIGNUP_FIRST_NAME,
    firstName
  }
};

export const addSignupLastName = (lastName) => {
  return {
    type: actions.SIGNUP_LAST_NAME,
    lastName
  }
};

export const submitSignup = () => {
  return {
    type: actions.SIGNUP_SUBMIT
  }
};

export const signupSuccess = (user) => {
  browserHistory.push('/dashboard');
  return {
    type: actions.SIGNUP_SUCCESS,
    user
  }
};

export const signupFailure = (error) => {
  return {
    type: actions.SIGNUP_FAILURE,
    error
  }
};

export const postSignup = (user) => {
  return (dispatch, getState) => {
    let state = getState();
    if(!state.postingSignup){
      dispatch(submitSignup());
      fetch('/auth/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300){
          dispatch(signupSuccess(response.user));
        }
        else {
          let error = new Error(response.statusText);
          dispatch(signupFailure(error));
        }
      })
    }
  }
}

export const submitLogout = () => {
  return {
    type: actions.LOGOUT_SUBMIT
  }
};

export const logoutSuccess = () => {
  return {
    type: actions.LOGOUT_SUCCESS
  }
};

export const logoutFailure = (error) => {
  return {
    type: actions.LOGOUT_FAILURE,
    error
  }
}

export const postLogout = () => {
  return (dispatch) => {
    dispatch(submitLogout());
    fetch('/auth/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300){
        dispatch(logoutSuccess());
      }
      else {
        let error = new Error(response.statusText);
        dispatch(logoutFailure(error));
      }
    })
  }
}
