import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getEventsArr } from '../../actions/eventActions';

class ListEvents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: {},
			errors: {}
		};
	}

	componentDidMount = () => {
		this.props.getEventsArr();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.events) {
			this.setState({
				events: nextProps.events
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	render() {
		const { events, errors } = this.state;

		let content;

		if (events.eventLoading) {
			content = (
				<p className="lead text-center">
					<span className="badge">
						<i className="fa fa-spinner fa-spin fa-3x" />
					</span>
				</p>
			);
		}

		if (Object.keys(errors).length > 0) {
			content = (
				<p className="lead text-center text-danger">
					<span className="badge">
						<i className="fas fa-exclamation-triangle fa-3x" />{' '}
						<br />
						<br />
						<br />
						Oops! Something went wrong. Try again, or contact
						an admin.
					</span>
				</p>
			);
		}

		if (
			Object.keys(events).length > 0 &&
			events.eventsArr instanceof Array
		) {
			content = (
				<ul>
					{this.state.events.eventsArr.map((event, index) => (
						<li key={index}>{event.name}</li>
					))}
				</ul>
			);
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-10 m-auto">
						<h2 className="display-4 text-center mt-4">
							Events
						</h2>
						{content}
					</div>
				</div>
			</div>
		);
	}
}

ListEvents.propTypes = {
	events: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	events: state.events,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getEventsArr }
)(ListEvents);
