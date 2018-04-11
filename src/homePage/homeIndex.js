import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class HomeIndex extends Component {
  render() {
    const { route } = this.props;console.log(route)
    return (
      <div>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default HomeIndex;