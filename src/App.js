import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import './App.css';
import Alert from 'react-s-alert';

class App extends Component {
  render() {
    const { route } = this.props;
    return (
      <div className="App">
        {renderRoutes(route.routes)}
        <Alert effect='scale' position='top' stack={{limit: 1}}/>
      </div>
    );
  }
}

export default App;
