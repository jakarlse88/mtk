import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class ManageContent extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="display-4 text-center mt-4">Manage Content</h2>
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
					<div className="col-12 text-center">
						<Link to="/dashboard">
							<button className="btn btn-secondary mt-2">
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
		imgAlt: 'Content',
		cardTitle: 'Articles',
		cardText: 'Write a new article, or manage already existing articles',
		permissions: 'Admin',
		linkTo: '/manage-articles'
	},
	{
		imgSrc: 'https://via.placeholder.com/350x185',
		imgAlt: 'Event',
		cardTitle: 'Information',
		cardText: 'Manage informational pages',
		permissions: 'Admin, instructor, public',
		linkTo: '/manage-information'
	}
];
