import { Link } from 'react-router-dom';
import React from 'react';

export default ({ location }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col s12 center-align">
					<h2>404</h2>
					<p>
						The route <code>{location.pathname}</code> could not be found.{' '}
					</p>
					<p>
						<Link to="/">Return to the front page?</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
