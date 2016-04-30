import * as actions from '../actions/authActions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  postingLogin: false,
  loginSuccess: false,
  loginErrorMsg: '',
  postingSignup: false,
  signupSuccess: false,
  signupErrorMsg: '',
  postingLogout: false,
  logoutErrorMsg: '',
  userAuthenticated: false
}

export default userAuthReducer (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return Object.assign({}, state, {
        email: action.email
      });
    case actions.ADD_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    case actions.LOGIN_SUBMIT:
      return Object.assign({}, state, {
        postingLogin: true,
      });
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        password: '',
        postingLogin: false,
        loginSuccess: true,
        userAuthenticated: true
      });
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        postingLogin: false,
        loginErrorMsg: action.error
      });
    case actions.SIGNUP_FIRST_NAME:
      return Object.assign({}, state, {
        firstName: action.firstName
      });
    case actions.SIGNUP_LAST_NAME:
      return Object.assign({}, state, {
        lastName: action.lastName
      });
    case actions.SIGNUP_SUBMIT:
      return Object.assign({}, state, {
        postingSignup: true
      });
    case actions.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        password: '',
        postingSignup: false,
        signupSuccess: true,
        userAuthenticated: true
      });
    case actions.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        postingSignup: false,
        signupErrorMsg: action.error
      });
    case actions.LOGOUT_SUBMIT:
      return Object.assign({}, state, {
        postingLogout: true
      });
    case actions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        postingLogin: false,
        loginSuccess: false,
        loginErrorMsg: '',
        postingSignup: false,
        signupSuccess: false,
        signupErrorMsg: '',
        postingLogout: false,
        logoutErrorMsg: '',
        userAuthenticated: false
      });
    case actions.LOGOUT_FAILURE:
      return Object.assign({}, state, {
        logoutErrorMsg: action.error
      });
    default:
      return state
  }
}
