import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class ManageArticles extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 m-auto">
						<h2 className="display-4 mt-4 text-center">Manage Articles</h2>
						<hr />
					</div>
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
					<div className="col-12 m-auto">
						<Link to="/manage-content" className="d-block text-center">
							<button className="btn btn-secondary">
								<span className="badge">
									<i className="fas fa-arrow-left" />
								</span>{' '}
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
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Event',
		cardTitle: 'Create Article',
		cardText: 'Create a new, unique article.',
		permissions: 'Admin, moderator',
		linkTo: '/create-article'
	},
	{
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Event',
		cardTitle: 'View Articles',
		cardText: 'List all articles in database.',
		permissions: 'Admin, moderator, public',
		linkTo: '/articles'
	}
];
