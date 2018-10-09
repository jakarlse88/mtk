import { Link } from 'react-router-dom';
import React from 'react';

export default () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col s12 center-align">
					<h2>Registrering vellykket!</h2>
					<p>
						Du kan nå <Link to="/login">logge inn</Link>.
					</p>
				</div>
			</div>
		</div>
	);
};
