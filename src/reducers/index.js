import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userAuth from './userAuthReducer';
import calendar from './calendarReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  userAuth,
  calendar
});

export default rootReducer;
