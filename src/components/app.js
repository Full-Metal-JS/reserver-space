import React, { Component } from 'react';
import DevTools from './devTools';

export default class App extends Component {

  render() {
    let devTools = process.env.NODE_ENV === 'development' ? <DevTools/> : '';
    
    return (
      <div>
        {this.props.children}
        {devTools}
      </div>
    );
  }
}
