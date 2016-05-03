import {connect} from 'react-redux';
import Signup from '../components/signup';
import {addEmail, addPassword, addSignupFirstName, addSignupLastName, postSignup} from '../actions/authActions';

function mapStateToProps(state) {
  return {
    userFirstName: state.userAuth.firstName,
    userLastName: state.userAuth.lastName,
    userEmail: state.userAuth.email,
    userPassword: state.userAuth.password
  }
};

function mapDispatchToProps(dispatch) {
  return {
    addFirstName: (firstName) => {
      dispatch(addSignupFirstName(firstName));
    },
    addLastName: (lastName) => {
      dispatch(addSignupLastName(lastName));
    },
    addEmail: (email) => {
      dispatch(addEmail(email));
    },
    addPassword: (password) => {
      dispatch(addPassword(password));
    },
    postSignup: (user) => {
      dispatch(postSignup(user));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
