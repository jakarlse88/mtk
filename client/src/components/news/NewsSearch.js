import React, { Component } from 'react';

export default class NewsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  onSearchFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <label htmlFor="articleQuery">
          Article search:
        </label>

        <input
          id="articleQuery"
          className="form-control"
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.onSearchFieldChange}
        />
        <small
          id="queryBlockHelp"
          className="form-text text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Vitae voluptatum maiores fugit
          necessitatibus sed, repellendus officia laudantium
          architecto consequatur! Nesciunt?
        </small>
      </div>
    );
  }
}
