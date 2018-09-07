import { Link } from 'react-router-dom';
import React from 'react';

export default () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-8 m-auto">
          <h2 className="mt-4 text-center">Registrering vellykket!</h2>
          <p className="lead text-center">
            Du kan nå <Link to="/login">logge inn</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
