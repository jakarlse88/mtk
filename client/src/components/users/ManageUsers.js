import { Link } from 'react-router-dom';
import React, { Component } from 'react';

/*
 * TODO: view all users
 */

export default class ManageUsers extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="center-align">Manage Users</h2>
				<div className="row center-align">
					{items.map((item, index) => (
						<div className="col s12 m12 center-align" key={index}>
							<i className={`fas fa-${item.icon} fa-3x`} />
							<Link to={item.linkTo} className="center-align">
								<h5>{item.cardTitle}</h5>
							</Link>
							<p>{item.cardText}</p>
							<small className="grey-text">{item.permissions}</small>
						</div>
					))}
					<div className="row">
						<div className="col" />
					</div>
					<div className="row">
						<div className="col" />
					</div>
					<div className="row">
						<div className="col" />
					</div>
					<div className="col s12 center-align">
						<Link to="/dashboard">
							<button className="btn grey">
								<i className="fas fa-arrow-left left" />
								Back
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const items = [
	{
		icon: 'plus',
		cardTitle: 'Register User',
		cardText: 'Create a new, unique user.',
		permissions: 'Admin',
		linkTo: '/register-user'
	}
];
