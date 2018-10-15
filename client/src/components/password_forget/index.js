import React from 'react';

import PasswordForgetForm from './PasswordForgetForm';

const PasswordForget = () => (
	<div className="container">
		<div className="row">
			<div className="col s12 center-align">
				<h2>Glemt passord</h2>
			</div>
		</div>
		<div className="row">
			<PasswordForgetForm />
		</div>
	</div>
);

export default PasswordForget;
