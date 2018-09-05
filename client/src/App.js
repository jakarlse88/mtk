import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import AboutClub from './components/information/AboutClub';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';
import Information from './components/information/Information';
import Landing from './components/layout/Landing';
import Login from './components/login/Login';
import Navbar from './components/layout/Navbar';
import News from './components/news/News';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={Navbar} />
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/contact"
            component={Contact}
          />
          <Route exact path="/news" component={News} />
          <Route
            exact
            path="/information"
            component={Information}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/about-club"
            component={AboutClub}
          />
          <Route path="/" component={Footer} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
