import PropTypes from 'prop-types';

import React, { Component } from 'react';

export default class Jumbotron extends Component {
	render() {
		return (
			<section className="row">
				<div className="col s12 center-align">
					<h2>{this.props.title}</h2>
				</div>
				<div className="row">
					<div className="col s12 center-align">
						<p className="flow-text">{this.props.content}</p>
					</div>
				</div>
			</section>
		);
	}
}

Jumbotron.defaultProps = {
	title: 'Velkommen!',
	content:
		'Vi tilbyr trening i tradisjonell Taekwondo, Hapkido, Brasiliansk Jujutsu, og Muay Thai. Vi arrangerer også selvforsvarskurs for kvinner, og vi har løpende inntak av nye medlemmer. '
};

Jumbotron.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};
