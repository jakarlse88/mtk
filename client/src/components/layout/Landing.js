import React, { Component } from 'react';

import CardDeck from '../common/CardDeck';
import Jumbotron from '../common/Jumbotron';

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-xs-10">
            <Jumbotron />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-xs-10">
            <CardDeck />
          </div>
        </div>
      </div>
    );
  }
}
