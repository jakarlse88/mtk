import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
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
		const { auth } = this.props;
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
						<i className="fas fa-exclamation-triangle fa-3x" /> <br />
						<br />
						<br />
						Oops! Something went wrong. Try again, or contact an admin.
					</span>
				</p>
			);
		}

		if (
			Object.keys(events).length > 0 &&
			events.eventsArr instanceof Array
		) {
			content = events.eventsArr.map((event, index) => (
				<div key={index} className="card mb-2">
					<div className="card-body">
						<h5 className="card-title">{event.name}</h5>
						<p className="card-text">{event.description}</p>
						<Link to={`/single-event/${event._id}`}>
							<span className="badge">
								<i className="fas fa-search fa-xl mt-2" />
							</span>{' '}
							View event
						</Link>
						<br />
						{auth.user.role === 'admin' && (
							<Link
								to={`/admin-event/${event._id}`}
								className="text-warning">
								<span className="badge">
									<i className="fas fa-cogs fa-xl mt-2" />
								</span>{' '}
								Administrate event
							</Link>
						)}
					</div>
					<div className="card-footer">
						<span className="badge text-muted text-">
							<i className="fas fa-info-circle fa-lg" />
						</span>
						<small className="text-muted">
							{event.eventType},{' '}
							<Moment date={event.startDate} format="dddd DD/MM/YYYY" /> to{' '}
							<Moment date={event.endDate} format="dddd DD/MM/YYYY" /> by{' '}
							{event.owner}
						</small>
					</div>
				</div>
			));
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 m-auto">
						<h2 className="display-4 text-center mt-4">Events</h2>
						<hr />
					</div>
					<div className="col-10 m-auto">{content}</div>
					{this.props.auth.isAuthenticated ? (
						<div className="col-8 m-auto text-center">
							<Link to="/manage-events">
								<button className="btn btn-secondary mt-2 mb-4">
									<span className="badge">
										<i className="fas fa-arrow-left" />
									</span>{' '}
									Back
								</button>
							</Link>
						</div>
					) : (
						<div className="col-8 m-auto text-center">
							<Link to="/">
								<button className="btn btn-secondary mt-2 mb-4">
									<span className="badge">
										<i className="fas fa-arrow-left" />
									</span>{' '}
									Home
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		);
	}
}

ListEvents.propTypes = {
	events: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	events: state.events,
	errors: state.errors,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getEventsArr }
)(ListEvents);
