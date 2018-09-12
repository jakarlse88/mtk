import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class ManageUsers extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="h3 text-center mt-4">Manage Users</h2>
				<div className="row mt-4 mb-4">
					{items.map((item, index) => (
						<div
							className="col-12 col-sm-6 col-lg-4 m-auto"
							key={index}>
							<div className="card mb-4">
								<img
									src="https://via.placeholder.com/350x185"
									alt="Description"
									className="card-img-top"
								/>
								<div className="card-body">
									<Link
										to={item.linkTo}
										className="text-center">
										<h5 className="card-title">
											{item.cardTitle}
										</h5>
									</Link>
									<p className="card-text text-muted">
										{item.cardText}
									</p>
								</div>
								<div className="card-footer">
									<small className="text-muted">
										{item.permissions}
									</small>
								</div>
							</div>
						</div>
					))}
					<div className="col-12 text-center">
						<Link to="/dashboard">
							<button className="btn btn-danger mt-2">
								<span className="badge">
									<i className="fas fa-angle-left fa-lg" />
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
		imgAlt: 'User',
		cardTitle: 'Register User',
		cardText: 'Create a new, unique user.',
		permissions: 'Admin',
		linkTo: '/register-user'
	}
];
