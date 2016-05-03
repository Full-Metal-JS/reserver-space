import {connect} from 'react-redux';
import Login from '../components/login';
import {addLoginEmail, addLoginPassword, postLogin} from '../actions/authActions';

function mapStateToProps(state) {
  return {
    userEmail: state.userAuth.email,
    userPassword: state.userAuth.password
  }
};

function mapDispatchToProps(dispatch) {
  return {
    addEmail: (email) => {
      dispatch(addEmail(email));
    },
    addPassword: (password) => {
      dispatch(addPassword(password));
    },
    postLogin: (user) => {
      dispatch(postLogin(user));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
