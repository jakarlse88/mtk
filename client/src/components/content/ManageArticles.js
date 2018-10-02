import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class ManageArticles extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2 className="center-align">Manage Articles</h2>
					</div>
					{items.map((item, index) => (
						<div className="col s12 m6 center-align" key={index}>
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
					<div className="col s12 center-align">
						<Link to="/manage-content" className="center-text">
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
		cardTitle: 'Create Article',
		cardText: 'Create a new, unique article.',
		permissions: 'Admin, moderator',
		linkTo: '/create-article'
	},
	{
		icon: 'list-alt',
		cardTitle: 'View Articles',
		cardText: 'List all articles in database.',
		permissions: 'Admin, moderator, public',
		linkTo: '/articles'
	}
];
