import React from 'react';

import AuthUserContext from '../context/AuthUserContext';
import PasswordForgetForm from '../password_forget/PasswordForgetForm';
import PasswordUpdateForm from '../password_update/PasswordUpdateForm';

export default () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2>Brukerkonto</h2>
						<p className="grey-text">{authUser.email}</p>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col s12 center-align">
						<h4>Tilbakestill passord</h4>
						<PasswordForgetForm />
					</div>
				</div>
				<div className="row">
					<div className="col s12 center-align">
						<h4>Oppdatér passord</h4>
						<PasswordUpdateForm />
					</div>
				</div>
			</div>
		)}
	</AuthUserContext.Consumer>
);
