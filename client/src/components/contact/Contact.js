import React, { Component } from 'react';

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const newMsg = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };

    console.log(newMsg);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4 justify-content-center justify-content-lg-start">
          <div className="col-9">
            <h4>Kontakt oss</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="nameInput">
                  Ditt navn:
                </label>
                <input
                  id="nameInput"
                  value={this.state.name}
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={this.onChange}
                />
                <small className="form-text text-muted">
                  Obligatorisk felt.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">
                  Din email-adresse:
                </label>
                <input
                  id="emailInput"
                  value={this.state.email}
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={this.onChange}
                />
                <small className="form-text text-muted">
                  Obligatorisk felt.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="subjectInput">Emne:</label>
                <input
                  id="subjectInput"
                  value={this.state.subject}
                  name="subject"
                  type="subject"
                  className="form-control"
                  onChange={this.onChange}
                />
                <small className="form-text text-muted">
                  Obligatorisk felt.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="textArea">
                  Din melding:
                </label>
                <textarea
                  onChange={this.onChange}
                  name="message"
                  id="textArea"
                  cols="30"
                  rows="10"
                  className="form-control"
                />
              </div>
            </form>
            <button
              type="submit"
              onClick={this.onSubmit}
              className="btn btn-dark mb-4">
              Send
            </button>
          </div>
          <div className="col-12 col-lg-3 mt-4">
            <p className="text-muted">
              {' '}
              Vi gjør vårt beste for å besvare deg så raskt
              som mulig.Har du ikke hørt noe innen noen
              dager og det haster ber vi deg ta kontakt med
              oss direkte via telefon istedet.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
