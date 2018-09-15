import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="display-4 h3 text-center mt-4">Dashboard</h2>
				<hr />
				<div className="row mt-4 mb-4">
					{items.map((item, index) => (
						<div className="col-12 col-sm-6 col-lg-4 m-auto" key={index}>
							<div className="card mb-4">
								<img
									src="https://via.placeholder.com/350x185"
									alt="Description"
									className="card-img-top"
								/>
								<div className="card-body">
									<Link to={item.linkTo} className="text-center">
										<h5 className="card-title">{item.cardTitle}</h5>
									</Link>
									<p className="card-text text-muted">{item.cardText}</p>
								</div>
								<div className="card-footer">
									<small className="text-muted">{item.permissions}</small>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const items = [
	{
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Manage events',
		cardTitle: 'Manage Events',
		cardText: 'Seminars, gradings, training camps, etc.',
		permissions: 'Admin, instructor',
		linkText: 'Events',
		linkTo: '/manage-events'
	},
	{
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Manage content',
		cardTitle: 'Manage Content',
		cardText: 'Schedule, news, individual page content, etc.',
		permissions: 'Admin, instructor',
		linkText: 'Content',
		linkTo: '/manage-content'
	},
	{
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Manage users',
		cardTitle: 'Manage Users',
		cardText: 'Register new users, edit/update/delete existing users',
		permissions: 'Admin',
		linkText: 'Users',
		linkTo: '/manage-users'
	}
];
