import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers/index';

export default function configureStore(history, initialState = {}){
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk, routerMiddleware(history))
  );

    return store;
  )
}
