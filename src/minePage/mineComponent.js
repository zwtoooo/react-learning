import React from 'react';
import FooterComponent from '../footer';

class MinePageComponent extends React.Component {

  constructor({history, route}) {
    super();
    this.state = {
      history,
      route
    }
  }

  render() {
    return (
      <div>minePage
        <FooterComponent {...this.state.route}/>
      </div>
    )
  }

}

export default MinePageComponent;