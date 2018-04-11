import React from 'react';
import {
  Link
} from 'react-router-dom';

import ROUTES from './AppRoutes';

class Footer extends React.Component {

  render() {
    const { title } = this.props;
    const mainRoutes = ROUTES[0].routes.slice(0, 4);
    return (
      <footer>
        {mainRoutes.map((route, index) => {
          return (
            <div className={route.title === title ? 'active' : ''} key={index}><Link to={route.path}><p className={'iconfont '+route.icon}></p>{route.title}</Link></div>
          )
        })}
      </footer>
    )
  }

}

export default Footer;