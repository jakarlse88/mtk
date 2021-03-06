import { Link } from 'react-router-dom';
import React from 'react';

export default ({ onLogoutClick }) => (
	<>
		<li>
			<Link
				className="waves-effect waves-blue grey-text text-darken-2"
				to="/dashboard">
				Kontrollpanel
			</Link>
		</li>
		<li>
			<Link
				to="/account"
				className="waves-effect waves-blue text-darken-2 grey-text">
				Brukerkonto
			</Link>
		</li>
		<li>
			<a
				href="#!"
				className="grey-text text-darken-2"
				onClick={onLogoutClick}>
				Logg ut
			</a>
		</li>
	</>
);
