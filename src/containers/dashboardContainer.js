import {connect} from 'react-redux';
import Dashboard from '../components/dashboard';
import {postLogout} from '../actions/authActions';

function mapStateToProps(state) {
  return {
    userAuthenticated: state.userAuth.userAuthenticated
  }
};

function mapDispatchToProps(dispatch) {
  return {
    submitLogout: () => {
      dispatch(postLogout());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
