import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<h2 className="center-align">Dashboard</h2>
				</div>
				<div className="row" />
				<div className="row mt-4 mb-4">
					{items.map((item, index) => (
						<div className="col s12 m6 l4 center-align" key={index}>
							<i className={`fas fa-${item.icon} fa-3x`} />
							<Link to={item.linkTo} className="text-center">
								<h5 className="card-title">{item.cardTitle}</h5>
							</Link>
							<p className="card-text text-muted">{item.cardText}</p>
							<small className="text-muted">{item.permissions}</small>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const items = [
	{
		icon: 'tasks',
		cardTitle: 'Manage Events',
		cardText: 'Seminars, gradings, training camps, etc.',
		permissions: 'Admin, instructor',
		linkText: 'Events',
		linkTo: '/manage-events'
	},
	{
		icon: 'align-justify',
		cardTitle: 'Manage Content',
		cardText: 'Schedule, news, individual page content, etc.',
		permissions: 'Admin, instructor',
		linkText: 'Content',
		linkTo: '/manage-content'
	},
	{
		icon: 'users',
		cardTitle: 'Manage Users',
		cardText: 'Register new users, edit/update/delete existing users',
		permissions: 'Admin',
		linkText: 'Users',
		linkTo: '/manage-users'
	}
];
