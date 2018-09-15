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

	parseSchedule = scheduleArray => {
		const newSchedule = {};

		let previousDate;

		for (let item of scheduleArray) {
			if (!previousDate) {
				previousDate = item.date;
				newSchedule[item.date] = [];
				newSchedule[item.date].push(item.content);
			}

			if (previousDate && item.date === previousDate) {
				newSchedule[item.date].push(item.content);
			}

			if (previousDate && item.date !== previousDate) {
				previousDate = item.date;
				newSchedule[item.date] = [];
				newSchedule[item.date].push(item.content);
			}
		}

		return newSchedule;
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
			const schedule =
				event.schedule && event.schedule.length
					? this.parseSchedule(event.schedule)
					: null;

			content = (
				<Fragment>
					<div className="col-12">
						<h2 className="text-center mt-4">{event.name}</h2>

						{event.owner && (
							<p className="text-center">
								<small className="text-muted">
									TYPE: {event.eventType} - GROUP: {event.eventGroup} -
									OWNER: {event.owner}
								</small>
							</p>
						)}
						<hr />
						<div className="row">
							<div className="col-12 col-md-4">
								<p className="lead">Dates:</p>
								<p>
									<Moment date={event.startDate} format="DD MMMM YYYY" />
									{event.startDate !== event.endDate && (
										<span>
											-{' '}
											<Moment date={event.endDate} format="DD MMMM YYYY" />
										</span>
									)}
								</p>
							</div>

							<div className="col-12 col-md-4">
								<p className="lead">Prize:</p>
								<p>
									{event.prize}
									,-
								</p>
							</div>

							<div className="col-12 col-md-4">
								<p className="lead">Description:</p>
								<p>{event.description}</p>
							</div>
						</div>
					</div>
					{/* FIXME: such jank, much wow */}
					<div className="col-12">
						<h2 className="text-center mt-4">Schedule</h2>
						<hr />
						{schedule ? (
							<div className="row">
								{Object.keys(schedule).map((dateItem, dateIndex) => (
									<div key={dateIndex} className="col-12 col-lg-4">
										<ul className="list-group mb-4">
											<span className="lead">
												<Moment date={dateItem} format="dddd DD/MM" />:{' '}
											</span>
											{schedule[dateItem].map(
												(contentItem, contentIndex) => (
													<li
														key={contentIndex}
														className="list-group-item">
														{contentItem}
													</li>
												)
											)}
										</ul>
									</div>
								))}
							</div>
						) : (
							<p className="text-muted">No schedule information found.</p>
						)}
					</div>

					{/*  TODO: implement the below */}
					<div className="col-12">
						<h2 className="text-center mt-4">Participants</h2>
						<hr />
						{event.participants > 0 ? (
							<p>
								<strong>Participants:</strong>
								<ul>
									{event.participants.map(participant => (
										<li>{participant.name}</li>
									))}
								</ul>
							</p>
						) : (
							<p className="text-muted">
								No participant information found.
							</p>
						)}
					</div>
					<div className="col-12 text-center">
						<Link to="/list-events">
							<button className="btn btn-danger mt-2 mb-4">
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
