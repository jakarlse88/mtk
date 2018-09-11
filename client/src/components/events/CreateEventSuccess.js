import { Link } from 'react-router-dom';
import React from 'react';

export default props => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-8 m-auto">
					<h2 className="mt-4 text-center">
						Event successfully created.
					</h2>
					<p className="text-center">
						ID:{' '}
						<small className="text-muted">
							{props.match.params.id}
						</small>
					</p>
					<hr />
					<p className="lead text-center">
						Return to <Link to="/manage-events">events</Link>,
						or view your newly created{' '}
						<Link
							to={`/single-event/${props.match.params.id}`}>
							event
						</Link>
						?
					</p>
				</div>
			</div>
		</div>
	);
};
