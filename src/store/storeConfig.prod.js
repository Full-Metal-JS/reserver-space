import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers/index';

export default (history, initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk, routerMiddleware(history))
  ))
