import React, { Component, Fragment } from 'react';
import './App.css';

import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <Landing />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
