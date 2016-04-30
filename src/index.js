import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './components/app';
import HomeContainer from './containers/homeContainer';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}>
          <IndexRoute path='login' component={loginContainer}></IndexRoute>
          <Route path='signup' component={signupContainer}></Route>
        </IndexRoute>
      </Route>
      <Redirect from='*' to='/' />
    </Router>
  </Provider>
  , document.getElementById('app'));
