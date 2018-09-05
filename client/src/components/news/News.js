import React, { Component } from 'react';

import NewsArchive from './NewsArchive';
import NewsItem from './NewsItem';
import NewsSearch from './NewsSearch';

export default class News extends Component {
  render() {
    let newsItems = ['', '', '', '', ''];

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 col-lg-9 d-flex justify-content-center justify-content-lg-start">
            <div className="row">
              {newsItems.map(item => (
                <div className="col-12">
                  <NewsItem />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end">
            <div className="row align-items-start">
              <div className="col-12 d-flex justify-content-center justify-content-lg-end">
                <NewsSearch />
              </div>
              <div className="col-12 d-flex justify-content-center justify-content-lg-end">
                <NewsArchive />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
