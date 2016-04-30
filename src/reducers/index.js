import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userAuthReducer from './userAuthReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  userAuth: userAuthReducer
});

export default rootReducer;
