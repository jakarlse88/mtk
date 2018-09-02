import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div className="row align-items-center navbar-dark bg-dark navbar sticky-top">
        <div className="col-12 col-l-4 col-lg-4 d-flex justify-content-center justify-content-lg-start">
          <Link to="/">
            <h1 className="h4 mt-2 ml-2 text-light">
              Moss Taekwondo Klubb
            </h1>
          </Link>
        </div>
        <div className="col-12 col-l-8 col-lg-8">
          <nav className="nav d-flex justify-content-center justify-content-lg-end">
            <Link
              to="/news"
              className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-file fa-lg" />
              </span>
              Nyheter
            </Link>
            <Link
              to="/information"
              className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-info fa-lg" />
              </span>
              Informasjon
            </Link>
            <Link
              to="/contact"
              className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-envelope fa-lg" />
              </span>
              Kontakt oss
            </Link>
            <Link
              to="/login"
              className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-user fa-lg" />
              </span>
              Login
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}
