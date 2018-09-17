import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import CardDeck from '../common/CardDeck';

export default class ManageInformation extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 m-auto">
						<h2 className="display-4 mt-4 text-center">
							Manage Information
						</h2>
						<hr />
					</div>

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
