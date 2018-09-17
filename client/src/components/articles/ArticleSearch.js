import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ArticleSearch extends Component {
	onSearchFieldChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<div>
				<hr />
				<label htmlFor="articleQuery">
					<p className="lead"> Article search:</p>
				</label>

				<input
					id="articleQuery"
					className="form-control mb-4"
					type="text"
					value={this.props.value}
					name="query"
					placeholder="Query"
					onChange={this.props.onFilterChange}
				/>
				<small id="queryBlockHelp" className="form-text text-muted">
					Filter posts by author, category, and/or title.
				</small>
			</div>
		);
	}
}

ArticleSearch.propTypes = {
	onFilterChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};
