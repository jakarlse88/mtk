import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InputField from '../common/InputField';

export default class ArticleSearch extends Component {
	onSearchFieldChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<div className="input-field">
				<InputField
					icon="search"
					inputId="articleQuery"
					className="validate"
					type="text"
					placeholder="Søk i nyheter"
					value={this.props.value}
					name="query"
					onChange={this.props.onFilterChange}
					labelText="Du kan søke i overskrifter og forfattere."
				/>
				{this.props.articlesContent.length < 1 && (
					<p className="flow-text red-text center-align">
						Ingen resultater.
					</p>
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
