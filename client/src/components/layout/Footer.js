import React, { Component } from 'react';

import Card from '../common/Card';

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid bg-dark">
        <div className="container">
          <div className="row bg-dark text-light">
            <div className="col-12 col-sm-6 col-lg-4">
              <address className="mt-3">
                <p className="lead">Kontakt oss</p>
                <b>Moss Taekwondo Klubb</b>
                <br />
                Rabekkgata 5 <br />
                N-1523, Moss <br />
                <br />
                Leder: leder (@) moss-tkd.no <br />
                Kasserer: kasserer (@) moss-tkd.no
              </address>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Card
                darkStyle={true}
                cardTitle="Begynne å trene?"
                cardText="Vi har løpende inntak av nye medlemmer, og to ukers uforpliktende prøvetid. Se våre treningstider, eller kontakt oss om du har spørsmål."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <p className="lead mt-3">
                Følg oss på sosiale medier!
              </p>
            </div>
            <div className="col-12">
              <p className="text-center">
                <small>
                  Copyright &copy;{' '}
                  {new Date().getFullYear()} Moss Taekwondo
                  Klubb
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
