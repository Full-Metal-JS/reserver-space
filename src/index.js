import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/storeConfig';
import reducers from './reducers';

import App from './components/app';
import HomeContainer from './containers/homeContainer';
import loginContainer from './containers/loginContainer';
import signupContainer from './containers/signupContainer';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={HomeContainer}>
          <IndexRoute component={loginContainer} />
          <Route path='signup' component={signupContainer}></Route>
        </IndexRoute>
      </Route>
      <Redirect from='*' to='/' />
    </Router>
  </Provider>
  , document.getElementById('app'));
