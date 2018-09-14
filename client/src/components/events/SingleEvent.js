import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Moment from 'react-moment';

import { getEvent } from '../../actions/eventActions';

class SingleEvent extends Component {
	componentDidMount = () => {
		this.props.getEvent(this.props.match.params.id);
	};

	render() {
		const { eventLoading, event } = this.props.events;
		let content;

		if (eventLoading) {
			content = (
				<p className="lead text-center">
					<span className="badge">
						<i className="fa fa-spinner fa-spin fa-3x" />
					</span>
				</p>
			);
		}

		if (Object.keys(this.props.errors).length > 0) {
			content = (
				<Fragment>
					<p className="lead text-center text-danger">
						<span className="badge">
							<i className="fas fa-exclamation-triangle fa-3x" /> <br />
							<br />
							<br />
							Oops! Something went wrong. Try again, or contact an admin.
						</span>
					</p>
					<div className="col-12 text-center">
						<Link to="/list-events">
							<button className="btn btn-danger mt-2">
								<span className="badge">
									<i className="fas fa-angle-left fa-lg" />
								</span>{' '}
								Back
							</button>
						</Link>
					</div>
				</Fragment>
			);
		}

		if (event) {
			content = (
				<Fragment>
					<div className="col-12">
						<h2 className="text-center mt-4">{event.name}</h2>
						{event.owner && (
							<p className="text-center">
								<small className="text-muted">Made by {event.owner}</small>
							</p>
						)}
						<hr />
						<p>
							<strong>From:</strong>
							<br />
							<Moment date={event.startTime} format="HH:MM" />,{' '}
							<Moment date={event.startDate} format="MMMM DD YYYY" />
						</p>
						<p>
							<strong>To:</strong>
							<br />
							<Moment date={event.endTime} format="HH:MM" />,{' '}
							<Moment date={event.endDate} format="MMMM DD YYYY" />
						</p>
						<p>
							<strong>Prize:</strong>
							<br />
							{event.prize}
							,-
						</p>

						<p>
							<strong>
								Description: <br />
							</strong>
							{event.description}
						</p>
					</div>

					<div className="col-12">
						<h2 className="text-center mt-4">Schedule</h2>
						<hr />
						<p>
							{/* TODO: local parsing so as to not list the same date more than once */}
							{event.schedule && event.schedule.length ? (
								<ul>
									{event.schedule.map(scheduleItem => (
										<li>
											<strong>{scheduleItem.date}:</strong>
											{scheduleItem.content}
										</li>
									))}
								</ul>
							) : (
								<p className="text-muted">
									No schedule information found.
								</p>
							)}
						</p>
					</div>

					{/*  TODO: implement the below */}
					{event.participants > 0 ? (
						<div className="col-12">
							<p>
								<strong>Participants:</strong>
								<ul>
									{event.participants.map(participant => (
										<li>{participant.name}</li>
									))}
								</ul>
							</p>
						</div>
					) : null}
					<div className="col-12 text-center">
						<Link to="/list-events">
							<button className="btn btn-danger mt-2">
								<span className="badge">
									<i className="fas fa-angle-left fa-lg" />
								</span>{' '}
								Back
							</button>
						</Link>
					</div>
				</Fragment>
			);
		}

		return (
			<div className="container">
				<div className="row">{content}</div>
			</div>
		);
	}
}

SingleEvent.propTypes = {
	events: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	events: state.events,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getEvent }
)(SingleEvent);
