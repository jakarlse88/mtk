import classnames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand text-light" to="/">
          <span className="badge">
            <i className="fas fa-yin-yang fa-lg mr-2" />
          </span>
          Moss Taekwondo Klubb
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarAltMarkup"
          aria-expanded="false"
          aria-label="toggle navigation">
          <span className="navbar-toggler-icon navbar-inverse" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/news" className=" nav-item nav-link">
              Nyheter
            </Link>
            <div className="nav-item dropdown">
              <a
                href="#!"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Informasjon
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink">
                <Link to="/test" className="dropdown-item">
                  Test
                </Link>
                <Link to="/test" className="dropdown-item">
                  Test
                </Link>
                <Link to="/test" className="dropdown-item">
                  Test
                </Link>
              </div>
            </div>
            <Link
              to="/contact"
              className=" nav-item nav-link">
              Kontakt oss
            </Link>
            <Link to="/login" className="nav-item nav-link">
              <span className="badge">
                <i className="fas fa-user fa-md" />
              </span>
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
