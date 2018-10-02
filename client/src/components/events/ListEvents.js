import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getEventsArr } from '../../actions/eventActions';

// TODO: pagination

class ListEvents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: {},
			errors: {},
			currentPage: 1,
			eventsPerPage: 5
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

	onClick = e => {
		this.setState({
			currentPage: Number(e.target.id)
		});
	};

	render() {
		const { auth } = this.props;
		const { currentPage, eventsPerPage, events, errors } = this.state;

		let content;

		// Event display logic
		const indexOfLastEvent = currentPage * eventsPerPage;
		const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
		const currentEvents = events.eventsArr.slice(
			indexOfFirstEvent,
			indexOfLastEvent
		);

		const renderEvents = currentEvents.map((event, index) => (
			<div className="col s12 l6">
				<div className="card horizontal hoverable" key={index}>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-title">{event.name}</span>
							<small className="grey-text">
								{event.eventType},{' '}
								<Moment date={event.startDate} format="dddd DD/MM/YYYY" />{' '}
								to <Moment date={event.endDate} format="dddd DD/MM/YYYY" />{' '}
								by {event.owner}
							</small>
							<br />
							<br />
							<p>{event.description}</p>
						</div>
						<div className="card-action">
							<Link to={`/single-event/${event._id}`}>
								<button className="btn blue waves-effect waves-blue">
									<i className="fas fa-search fa-xl left" />
									View event
								</button>
							</Link>
							{auth.user.role === 'admin' && (
								<Link
									to={`/admin-event/${event._id}`}
									className="red-text">
									<button className="btn blue waves-effect waves-blue">
										<i className="fas fa-cogs fa-xl left" />
										Administrate event
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		));

		// Logic for displaying page numbers
		const pageNumbers = [];
		for (
			let i = 1;
			i <= Math.ceil(events.eventsArr.length / eventsPerPage);
			i++
		) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => (
			<li
				className="waves-effect"
				id={number}
				key={number}
				onClick={this.onClick}>
				{number}
			</li>
		));

		if (events.eventLoading) {
			content = (
				<p className="flow-text center-align">
					<i className="fa fa-spinner fa-spin fa-3x" />
				</p>
			);
		}

		if (Object.keys(errors).length > 0) {
			content = (
				<p className="flow-text center-align red-text">
					<i className="fas fa-exclamation-triangle fa-3x" />
					<br />
					<br />
					<br />
					Oops! Something went wrong. Try again, or contact an admin.
				</p>
			);
		}

		if (
			Object.keys(events).length > 0 &&
			events.eventsArr instanceof Array
		) {
			content = events.eventsArr.map((event, index) => (
				<div className="col s12 l6">
					<div className="card horizontal hoverable" key={index}>
						<div className="card-stacked">
							<div className="card-content">
								<span className="card-title">{event.name}</span>
								<small className="grey-text">
									{event.eventType},{' '}
									<Moment
										date={event.startDate}
										format="dddd DD/MM/YYYY"
									/>{' '}
									to{' '}
									<Moment date={event.endDate} format="dddd DD/MM/YYYY" />{' '}
									by {event.owner}
								</small>
								<br />
								<br />
								<p>{event.description}</p>
							</div>
							<div className="card-action">
								<Link to={`/single-event/${event._id}`}>
									<button className="btn blue waves-effect waves-blue">
										<i className="fas fa-search fa-xl left" />
										View event
									</button>
								</Link>
								{auth.user.role === 'admin' && (
									<Link
										to={`/admin-event/${event._id}`}
										className="red-text">
										<button className="btn blue waves-effect waves-blue">
											<i className="fas fa-cogs fa-xl left" />
											Administrate event
										</button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			));
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h2 className="center-align">Events</h2>
						<div className="divider" />
					</div>
					<div className="row">
						<div className="col" />
					</div>
					<div className="col s12">{content}</div>
					<div className="row">
						<div className="col" />
					</div>
					{this.props.auth.isAuthenticated ? (
						<div className="col s12 center-align">
							<Link to="/manage-events">
								<button className="btn btn-secondary mt-2 mb-4">
									<i className="fas fa-arrow-left left" />
									Back
								</button>
							</Link>
						</div>
					) : (
						<div className="col s12 center-align">
							<Link to="/">
								<button className="btn grey">
									<i className="fas fa-arrow-left" />
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
