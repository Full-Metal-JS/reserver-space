import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import creatLogger from 'redux-logger';
import {syncHistory} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index';
import DevTools from '../components/devTools';

export default function configureStore(initialState){
  const reduxRouterMiddleware = syncHistory(browserHistory);

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        reduxRouterMiddleware,
        thunk,
        creatLogger()
      ),
      DevTools.instrument()
    )

    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

    return store;
  )
}
