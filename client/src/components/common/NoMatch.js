import { Link } from 'react-router-dom';
import React from 'react';

export default ({ location }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-8 m-auto">
					<h2 className="display-4 text-center mt-4">404</h2>
					<p className="lead text-center">
						The route <code>{location.pathname}</code> could not be found.{' '}
					</p>
					<p className="text-center">
						<Link to="/">Return to the front page?</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
