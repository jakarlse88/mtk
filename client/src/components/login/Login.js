import React, { Component } from 'react';

import { loginUser, setCurrentUser } from '../../actions/authActions';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    const loginData = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(loginData);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 m-auto">
            <h4 className="text-center mt-4">Admin/instruktør login</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  value={this.state.username}
                  onChange={this.onChange}
                  id="loginNameInput"
                  type="text"
                  name="username"
                  placeholder="Brukernavn"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  id="loginPasswordInput"
                  type="password"
                  placeholder="Passord"
                  className="form-control"
                />
              </div>
            </form>
            <button
              className="btn btn-dark mb-4"
              type="submit"
              onClick={this.onSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
