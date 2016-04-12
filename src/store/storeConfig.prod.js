import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {syncHistory} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index';

export default function configureStore(initialState){
  const reduxRouterMiddleware = syncHistory(browserHistory);

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(reduxRouterMiddleware, thunk)
  )

    return store;
  )
}
