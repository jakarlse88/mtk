import { Link } from 'react-router-dom';
import React from 'react';

const ManageEvents = () => (
	<div className="container">
		<div className="row">
			<h2 className="center-align">Manage Events</h2>
		</div>
		<div className="row">
			{items.map((item, index) => (
				<div className="col s12 m6 l6 center-align" key={index}>
					<i className={`fas fa-${item.icon} fa-3x`} />
					<Link to={item.linkTo} className="text-center">
						<h5>{item.cardTitle}</h5>
					</Link>
					<p className="grey-text">{item.cardText}</p>
					<small className="grey-text">{item.permissions}</small>
				</div>
			))}
		</div>
		<div className="row">
			<div className="col s12 center-align">
				<Link to="/dashboard">
					<button className="btn grey waves-effect waves-dark">
						<i className="left fas fa-arrow-left" />
						Back
					</button>
				</Link>
			</div>
		</div>
	</div>
);

const items = [
	{
		icon: 'plus-circle',
		cardTitle: 'Create event',
		cardText: 'Create a new, unique event.',
		permissions: 'Admin',
		linkTo: '/create-event'
	},
	{
		icon: 'list-alt',
		cardTitle: 'View events',
		cardText: 'List all events in database.',
		permissions: 'Admin, instructor, public',
		linkTo: '/list-events'
	}
];

export default ManageEvents;
