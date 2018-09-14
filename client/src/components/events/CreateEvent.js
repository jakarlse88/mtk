import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InputField from '../common/InputField';

import { createEvent } from '../../actions/eventActions';

import isEmpty from '../../utils/is-empty';

class CreateEvent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: '',
			errors: {},
			eventGroup: '',
			eventType: '',
			name: '',
			owner: '',
			prize: '',
			scheduleContentBuffer: '',
			scheduleDateBuffer: '',
			schedule: []
		};
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const newEventData = {
			description: this.state.description,
			eventGroup: this.state.eventGroup,
			eventType: this.state.eventType,
			name: this.state.name,
			owner: this.props.auth.user.name,
			prize: this.state.prize,
			schedule: this.state.schedule
		};

		this.props.createEvent(newEventData, this.props.history);
	};

	onScheduleItemAdd = e => {
		e.preventDefault();

		const { scheduleContentBuffer, scheduleDateBuffer } = this.state;

		// Date and content fields are required
		if (isEmpty(scheduleDateBuffer)) {
			this.setState({
				errors: {
					schedule: 'Schedule date is required'
				}
			});

			return;
		}

		if (isEmpty(scheduleContentBuffer)) {
			this.setState({
				errors: {
					schedule: 'Schedule content is required'
				}
			});

			return;
		}

		// Clear errors
		this.setState({
			errors: {
				schedule: ''
			}
		});

		// On submit, clear content field and update local schedule state

		const newItem = {
			date: scheduleDateBuffer,
			content: scheduleContentBuffer
		};

		this.setState({
			schedule: [...this.state.schedule, newItem],
			dateContentBuffer: ''
		});
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-10 m-auto">
						<h2 className="mt-4 text-center">Create Event</h2>
						<hr />
						{errors.alreadyExists && (
							<p className="text-danger">{errors.alreadyExists}</p>
						)}
						<div className="form-row">
							<div className="col-12">
								<p className="lead">General information</p>
							</div>
						</div>

						<form onSubmit={this.onSubmit} noValidate>
							<InputField
								inputId="nameInput"
								labelText="Name"
								name="name"
								placeholder="f.eks. 'Vintergradering 2018'"
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
							/>

							<InputField
								inputId="eventGroupInput"
								labelText="Event group"
								name="eventGroup"
								placeholder="Taekwondo, hapkido, jujutsu, muay thai, or self defense"
								value={this.state.eventGroup}
								onChange={this.onChange}
								error={errors.eventGroup}
							/>

							<div className="form-row">
								<div className="col-8">
									<InputField
										inputId="typeInput"
										labelText="Event type"
										name="eventType"
										placeholder="Grading, seminar, or social"
										value={this.state.eventType}
										onChange={this.onChange}
										error={errors.eventType}
									/>
								</div>
								<div className="col-4">
									<InputField
										inputId="prizeInput"
										labelText="Prize"
										name="prize"
										value={this.state.prize}
										onChange={this.onChange}
										error={errors.prize}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="descriptionInput">Description:</label>
								<textarea
									className="form-control"
									name="description"
									placeholder="f.eks. 'Gradering for TKD'"
									id="descriptionInput"
									value={this.state.description}
									onChange={this.onChange}
								/>
								{errors.description && (
									<div className="text-danger">{errors.description}</div>
								)}
							</div>
							<div className="row">
								<div className="col-12">
									<p className="lead">Schedule</p>
								</div>
							</div>
							<div className="form-group">
								<div className="form-row">
									<div className="col-12 col-md-2">
										<label htmlFor="scheduleDateInput">Date:</label>
										<input
											name="scheduleDateBuffer"
											type="date"
											className="form-control mb-2"
											id="scheduleDateInput"
											value={this.state.scheduleDateBuffer}
											onChange={this.onChange}
										/>
									</div>
									<div className="col-11 col-md-9">
										<label htmlFor="scheduleContentInput">Content: </label>
										<input
											placeholder="10:00-11:30 -- Gibon jase"
											type="text"
											className="form-control mb-2"
											id="scheduleContentInput"
											value={this.state.scheduleContentBuffer}
											onChange={this.onChange}
											name="scheduleContentBuffer"
										/>
									</div>
									<div className="col-1 d-flex">
										<button
											type="button"
											className="btn btn-success align-self-end mb-2"
											onClick={this.onScheduleItemAdd}>
											<i className="fas fa-plus" />
										</button>
									</div>
									{errors.schedule && (
										<div className="text-danger col-12">
											{errors.schedule}
										</div>
									)}
									{this.state.schedule.length > 0 && (
										<div className="col-12">
											<p className="text-muted">
												Schedule preview: <br />
												<ul>
													{this.state.schedule.map((item, index) => (
														<li key={index}>
															{Object.keys(item)[0]}:{' '}
															{item[Object.keys(item)[0]]}
														</li>
													))}
												</ul>
											</p>
										</div>
									)}
								</div>
							</div>

							<div className="col-12 m-auto">
								<p className="text-center">
									<button
										className="btn btn-success mb-4 mt-2"
										onClick={this.onSubmit}>
										Create Event
									</button>
								</p>
							</div>
						</form>
						<div className="col-10 m-auto text-center">
							<Link to="/manage-events">
								<button className="btn btn-danger mb-4 mt-2">
									<span className="badge">
										<i className="fas fa-angle-left fa-lg" />
									</span>{' '}
									Back
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateEvent.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createEvent }
)(withRouter(CreateEvent));
