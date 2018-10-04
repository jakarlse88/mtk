/*
 * Pagination based on https://stackoverflow.com/a/40234427/7041984
 */

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import classnames from 'classnames';

import { getEventsArr } from '../../actions/eventActions';

class ListEvents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: {},
			errors: {},
			currentPage: 1,
			eventsPerPage: 5,
			currentEvents: [],
			indexOfFirstEvent: null,
			indexOfLastEvent: null,
			pageNumbers: []
		};
	}

	componentDidMount = () => {
		this.props.getEventsArr();
	};

	componentWillReceiveProps = nextProps => {
		if (
			nextProps.events.eventsArr instanceof Array &&
			nextProps.events.eventsArr.length
		) {
			this.setState(prevState => {
				// Event display logic
				const indexOfLastEvent =
					prevState.currentPage * prevState.eventsPerPage;
				const indexOfFirstEvent =
					indexOfLastEvent - prevState.eventsPerPage;
				const currentEvents = nextProps.events.eventsArr.slice(
					indexOfFirstEvent,
					indexOfLastEvent
				);

				// Logic for displaying page numbers
				const pageNumbers = [];

				if (nextProps.events.eventsArr) {
					for (
						let i = 1;
						i <=
						Math.ceil(
							nextProps.events.eventsArr.length / prevState.eventsPerPage
						);
						i++
					) {
						pageNumbers.push(i);
					}
				}

				return {
					currentEvents,
					indexOfFirstEvent,
					indexOfLastEvent,
					pageNumbers
				};
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.currentPage !== prevState.currentPage) {
			const indexOfLastEvent =
				this.state.currentPage * this.state.eventsPerPage;
			const indexOfFirstEvent =
				indexOfLastEvent - this.state.eventsPerPage;
			const currentEvents = this.props.events.eventsArr.slice(
				indexOfFirstEvent,
				indexOfLastEvent
			);

			this.setState({
				indexOfFirstEvent,
				indexOfLastEvent,
				currentEvents
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
		const { currentEvents, events, errors, pageNumbers } = this.state;

		const renderEvents = currentEvents.map((event, index) => {
			return (
				<div className="col s12" key={index}>
					<div className="card horizontal hoverable">
						<div className="card-stacked">
							<div className="card-content">
								<span className="card-title">{event.name}</span>
								<small className="grey-text">
									{event.eventType},{' '}
									<Moment
										date={event.startDate}
										format="dddd DD/MM/YYYY"
									/>{' '}
									til{' '}
									<Moment date={event.endDate} format="dddd DD/MM/YYYY" />{' '}
									av {event.owner}
								</small>
								<br />
								<br />
								<p>{event.description}</p>
							</div>
							<div className="card-action">
								<Link to={`/single-event/${event._id}`}>
									<button className="btn btn-flat white black-text waves-effect waves-blue">
										<i className="fas fa-search fa-xl left" />
										Inspisér arrangement
									</button>
								</Link>
								{auth.user.role === 'admin' && (
									<Link
										to={`/admin-event/${event._id}`}
										className="red-text">
										<button className="btn btn-flat white black-text waves-effect waves-blue">
											<i className="fas fa-cogs fa-xl left" />
											Administrér arrangement
										</button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		});

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li
					className={classnames({
						'waves-effect': true,
						'waves-blue': true,
						active: number === this.state.currentPage
					})}
					key={number}
					onClick={this.onClick}>
					<a id={number} href="#!">
						{number}
					</a>
				</li>
			);
		});

		const renderLoading = (
			<p className="flow-text center-align">
				<i className="fa fa-spinner fa-spin fa-3x" />
			</p>
		);

		const renderErrors = (
			<p className="flow-text center-align red-text">
				<i className="fas fa-exclamation-triangle fa-3x" />
				<br />
				<br />
				<br />
				Oops! Noe gikk galt. Prøv igjen, eller kontakt en administrator.
			</p>
		);

		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h2 className="center-align">Arrangementer</h2>
						<div className="divider" />
					</div>
					<div className="row">
						<div className="col" />
					</div>
					<div className="col s12">
						{events.eventLoading ? (
							{ renderLoading }
						) : Object.keys(errors).length > 0 ? (
							{ renderErrors }
						) : (
							<Fragment>
								{renderEvents}
								<div className="row">
									<div className="col" />
								</div>
								<ul className="pagination center-align">
									{renderPageNumbers}
								</ul>
							</Fragment>
						)}
					</div>
					<div className="row">
						<div className="col" />
					</div>
					{this.props.auth.isAuthenticated ? (
						<div className="col s12 center-align">
							<Link to="/manage-events">
								<button className="btn grey mt-2 mb-4">
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
