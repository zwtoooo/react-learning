import React from 'react';

class NewPlaceComponent extends React.Component {

  constructor({history, route}) {
    super();
    this.state = {
      history,
      route
    }
  }

  render() {
    return (
      <div className="page">newplace
      </div>
    )
  }

}

export default NewPlaceComponent;