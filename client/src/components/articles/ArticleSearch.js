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
			<div className="input-field">
				<label htmlFor="articleQuery">Søk i nyheter</label>

				<input
					id="articleQuery"
					className="validate"
					type="text"
					value={this.props.value}
					name="query"
					onChange={this.props.onFilterChange}
				/>
				<span className="helper-text">
					Du kan søke i overskrifter og forfattere.
				</span>
				{this.props.articlesContent.length < 1 && (
					<span className="helper-text red-text">
						Ingen resultater, viser derfor alle artikler.
					</span>
				)}
			</div>
		);
	}
}

ArticleSearch.propTypes = {
	articlesContent: PropTypes.array,
	onFilterChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};
