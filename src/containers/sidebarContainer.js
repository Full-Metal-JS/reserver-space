import {connect} from 'react-redux';
import Sidebar from '../components/sidebar';

function mapStateToProps(state) {
  return {
    locationsList: state.data.locationsList,
    roomsList: state.data.roomsList
  }
};

function mapDispatchToProps(dispatch) {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
