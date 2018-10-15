import React from 'react';

import PasswordUpdateForm from './PasswordUpdateForm';

const PasswordChange = () => (
	<div className="container">
		<div className="row">
			<div className="col s12 center-align">
				<h2>Oppdatér passord</h2>
			</div>
		</div>
		<div className="row">
			<PasswordUpdateForm />
		</div>
	</div>
);

export default PasswordChange;
