import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import creatLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers/index';
import DevTools from '../components/devTools';

export default function configureStore(history, initialState = {}){

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
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
