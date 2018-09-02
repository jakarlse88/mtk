import React, { Component } from 'react';

import Card from '../common/Card';

// TODO: Fix newlines in card text

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid bg-dark">
        <div className="container">
          <div className="row bg-dark text-light">
            <div className="col-12 col-sm-6 col-lg-4">
              <Card
                darkStyle={true}
                cardTitle="Kontakt oss"
                cardLead="Moss Taekwondo Klubb"
                cardText="Rabekkgata 5
                N-1523, Moss
                Telefon: xx xx xx xx (leder)
                Epost: leder(@)moss-tkd.no
                Kasserer: kasserer(@)moss-tkd.no"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Card
                darkStyle={true}
                cardTitle="Kontakt oss"
                cardLead="Moss Taekwondo Klubb"
                cardText="Rabekkgata 5
                N-1523, Moss
                Telefon: xx xx xx xx (leder)
                Epost: leder(@)moss-tkd.no
                Kasserer: kasserer(@)moss-tkd.no"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Card
                darkStyle={true}
                cardTitle="Kontakt oss"
                cardLead="Moss Taekwondo Klubb"
                cardText="Rabekkgata 5
                N-1523, Moss
                Telefon: xx xx xx xx (leder)
                Epost: leder(@)moss-tkd.no
                Kasserer: kasserer(@)moss-tkd.no"
              />
            </div>
            <div className="col-12">
              <p className="text-muted text-center">
                Copyright &copy; {new Date().getFullYear()}{' '}
                Moss Taekwondo Klubb
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
