import React from 'react';
import FooterComponent from '../footer';

class OrderPageComponent extends React.Component {

  constructor({history, route}) {
    super();
    this.state = {
      history,
      route
    }
  }

  render() {
    return (
      <div>orderPage
        <FooterComponent {...this.state.route}/>
      </div>
    )
  }

}

export default OrderPageComponent;