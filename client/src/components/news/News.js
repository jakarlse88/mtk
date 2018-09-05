import React, { Component } from 'react';

import NewsArchive from './NewsArchive';
import NewsItem from './NewsItem';
import NewsSearch from './NewsSearch';

export default class News extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 d-flex justify-content-center justify-content-lg-start">
            <NewsItem />
          </div>
          <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
            <NewsSearch />
          </div>
          <div className="w-100" />
          <div className="col-12 d-flex justify-content-center justify-content-lg-end">
            <NewsArchive />
          </div>
        </div>
      </div>
    );
  }
}
