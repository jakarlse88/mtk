import React, { Component } from 'react';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="container">
				<h2 className="h3 text-center mt-4">Dashboard</h2>
				<div className="row mt-4 mb-4">
					{items.map(item => (
						<div className="col-12 col-sm-6 col-lg-4 m-auto">
							<div className="card mb-4">
								<img
									src="https://via.placeholder.com/350x185"
									alt="Descriptive image"
									className="card-img-top"
								/>
								<div className="card-body">
									<h5 className="card-title">
										Something Something
									</h5>
									<p className="card-text">
										Lorem ipsum dolor sit amet,
										consectetur adipisicing elit.
										Cupiditate, dolor! Maxime ex
										nostrum quae explicabo vel
										voluptatum soluta quisquam optio!
									</p>
								</div>
								<div className="card-footer">
									<small className="text-muted">
										Permissions here
									</small>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const items = ['', '', '', '', '', ''];
