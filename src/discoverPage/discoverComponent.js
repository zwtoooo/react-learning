import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import FooterComponent from '../footer';

class DiscoverPageComponent extends React.Component {

  constructor({history, route}) {
    super();
    this.state = {
      history,
      route
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div>
        <div className="page footer-page">discover
          <p><Link to="/discover/new">newplace</Link></p>
          <FooterComponent {...this.state.route}/>
        </div>
        {renderRoutes(route.routes)}
      </div>
    )
  }

}

export default DiscoverPageComponent;
