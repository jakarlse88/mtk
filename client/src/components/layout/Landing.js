import React, { Component } from 'react';

import Jumbotron from '../common/Jumbotron';

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-xs-12">
            <Jumbotron />
          </div>
        </div>
      </div>
    );
  }
}
