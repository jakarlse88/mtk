import { Link } from 'react-router-dom';
import React from 'react';

export default ({ linkTo }) => (
	<Link to={linkTo}>
		<button className="btn grey waves-effect waves-dark" type="button">
			<i className="fas fa-arrow-left left" />
			Tilbake
		</button>
	</Link>
);
