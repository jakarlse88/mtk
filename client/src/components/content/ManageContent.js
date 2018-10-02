import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class ManageContent extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="center-align">Manage Content</h2>
				<div className="row">
					<div className="row">
						<div className="col" />
					</div>
					{items.map((item, index) => (
						<div className="col s12 m6 l6 center-align" key={index}>
							<i className={`fas fa-${item.icon} fa-3x`} />
							<Link to={item.linkTo} className="text-center">
								<h5 className="card-title">{item.cardTitle}</h5>
							</Link>
							<p>{item.cardText}</p>
							<small className="grey-text">{item.permissions}</small>
						</div>
					))}
					<div className="row">
						<div className="col" />
					</div>
					<div className="row">
						<div className="col s12 center-align">
							<Link to="/dashboard">
								<button className="btn grey waves-effect waves-dark">
									<i className="fas left fa-arrow-left" />
									Back
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const items = [
	{
		icon: 'newspaper',
		cardTitle: 'Articles',
		cardText: 'Write a new article, or manage already existing articles',
		permissions: 'Admin',
		linkTo: '/manage-articles'
	},
	{
		icon: 'info-circle',
		cardTitle: 'Information',
		cardText: '"About" pages, schedule, etc.',
		permissions: 'Admin, instructor, public',
		linkTo: '/manage-information'
	}
];
