import React, { Component } from 'react';
import 'whatwg-fetch';

export default (WrappedComponent) => {
  class NewCompnent extends Component {

    sendReqByGet(url) {
      return fetch(url, {method: 'GET'}).then(response => response.json());
    }

    sendReqByPost(url, param) {
      let isObject = Object.prototype.toString.call(param) === '[object Object]';
      if (!isObject) {
        return;
      }
      return fetch(url, {method: 'POST', body: JSON.stringify(param)}).then(response => response.json());
    }

    imgHashChangeUrl(hash) {
      if (!hash) {
        return '';
      }
      return hash.replace(/(jpeg|png|jpg|gif)$/, '$1.$1');
    }

    render() {
      return <WrappedComponent 
              sendReqByGet={this.sendReqByGet}
              sendReqByPost={this.sendReqByPost}
              imgHashChangeUrl={this.imgHashChangeUrl}
              {...this.props} />
    }

  }

  return NewCompnent;
}