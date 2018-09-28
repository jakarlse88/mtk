import PropTypes from 'prop-types';

import React, { Component } from 'react';

export default class Jumbotron extends Component {
	render() {
		return (
			<div className="jumbotron">
				<h2 className="h3">{this.props.title}</h2>
				<p className="lead">{this.props.lead}</p>
				<hr className="my-4" />
				<p>{this.props.content}</p>
			</div>
		);
	}
}

// Temporary variables for testing purposes
// TODO: remove these
Jumbotron.defaultProps = {
	title: "Treningstider høsten '18",
	lead:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, minus.',
	content:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus optio sunt minima, laudantium nesciunt voluptate non laboriosam atque nam amet'
};

Jumbotron.propTypes = {
	title: PropTypes.string.isRequired,
	lead: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};
