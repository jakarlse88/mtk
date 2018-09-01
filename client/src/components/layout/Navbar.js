import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    // TODO: Collapse nav on breakpoint (or similar)
    return (
      <div className="row align-items-center navbar-dark bg-dark">
        <div className="col-12 col-s-12 col-m-12 col-l-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
          <h1 className="h4 mt-2 text-light">
            Moss Taekwondo Klubb
          </h1>
        </div>
        <div className="col-12 col-s-12 col-m-12 col-l-8 col-lg-8">
          <nav className="nav d-flex justify-content-center justify-content-lg-end">
            <a href="#!" className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-file fa-lg" />
              </span>
              Nyheter
            </a>
            <a href="#!" className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-info fa-lg" />
              </span>
              Informasjon
            </a>
            <a href="#!" className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-envelope fa-lg" />
              </span>
              Kontakt oss
            </a>
            <a href="#!" className="nav-link text-light">
              <span className="badge">
                <i className="fas fa-user fa-lg" />
              </span>
              Login
            </a>
          </nav>
        </div>
      </div>
    );
  }
}
