import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Moment from 'react-moment';

import { getEvent } from '../../actions/eventActions';

// TODO: change "Back" link depending on whether user is
// logged-in or a guest

class SingleEvent extends Component {
	componentDidMount = () => {
		this.props.getEvent(this.props.match.params.id);
	};

	render() {
		const { event } = this.props.events;
		let content;

		if (Object.keys(this.props.errors).length > 0) {
			content = (
				<Fragment>
					<p className="lead text-center text-danger">
						<span className="badge">
							<i className="fas fa-exclamation-triangle fa-3x" />{' '}
							<br />
							<br />
							<br />
							Oops! Something went wrong. Try again, or
							contact an admin.
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
							<small className="text-muted text-center">
								Made by {event.owner}
							</small>
						)}
						<hr />
					</div>
					<div className="col-12">
						<p>
							<strong>From:</strong>
							<br />
							<Moment
								date={event.startTime}
								format="HH:MM"
							/>
							,{' '}
							<Moment
								date={event.startDate}
								format="MMMM DD YYYY"
							/>
						</p>
					</div>
					<div className="col-12">
						<p>
							<strong>To:</strong>
							<br />
							<Moment
								date={event.endTime}
								format="HH:MM"
							/>,{' '}
							<Moment
								date={event.endDate}
								format="MMMM DD YYYY"
							/>
						</p>
					</div>
					<div className="col-12">
						<p>
							<strong>Prize:</strong>
							<br />
							{event.prize}
							,-
						</p>
					</div>

					<div className="col-12">
						<p>
							<strong>
								Description: <br />
							</strong>
							{event.description}
						</p>
					</div>
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
