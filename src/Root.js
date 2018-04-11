import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class Root extends Component {
  render() {
    const { route } = this.props;
    return (
      <div className="Root">
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default Root;