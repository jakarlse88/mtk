import { Link } from 'react-router-dom';
import React from 'react';

export default () => (
	<li>
		<Link
			className="waves-effect waves-blue grey-text text-darken-2"
			to="/signin">
			Logg inn
			<i className="right fas fa-user fa-1x" />
		</Link>
	</li>
);
