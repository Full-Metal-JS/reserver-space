import * as actions from './../actions/actionConstants'

const initialState = {
  id: '',
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
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return {...state, email: action.email};
    case actions.ADD_PASSWORD:
      return {...state, password: action.password};
    case actions.LOGIN_SUBMIT:
      return {...state, postingLogin: true};
    case actions.LOGIN_SUCCESS:
      return {...state,
        id: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        password: '',
        postingLogin: false,
        loginSuccess: true,
        userAuthenticated: true
      };
    case actions.LOGIN_FAILURE:
      return {...state,
        postingLogin: false,
        loginErrorMsg: action.error
      };
    case actions.SIGNUP_FIRST_NAME:
      return {...state, firstName: action.firstName};
    case actions.SIGNUP_LAST_NAME:
      return {...state, lastName: action.lastName};
    case actions.SIGNUP_SUBMIT:
      return {...state, postingSignup: true};
    case actions.SIGNUP_SUCCESS:
      return {...state,
        id: action.user.id,
        password: '',
        postingSignup: false,
        signupSuccess: true,
        userAuthenticated: true
      };
    case actions.SIGNUP_FAILURE:
      return {...state,
        postingSignup: false,
        signupErrorMsg: action.error
      };
    case actions.LOGOUT_SUBMIT:
      return {...state, postingLogout: true};
    case actions.LOGOUT_SUCCESS:
      return {...state,
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
      };
    case actions.LOGOUT_FAILURE:
      return {...state, logoutErrorMsg: action.error};
    default:
      return state;
  }
};

export default userAuthReducer;
