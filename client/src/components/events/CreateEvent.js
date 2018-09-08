import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InputField from '../common/InputField';

import { createEvent } from '../../actions/eventActions';

class CreateEvent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			description: '',
			endDate: '',
			endTime: '',
			eventType: '',
			owner: '',
			name: '',
			prize: '',
			startDate: '',
			startTime: ''
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
			endDate: this.state.endDate,
			endTime: this.state.endTime,
			eventType: this.state.eventType,
			owner: this.props.auth.user.name,
			name: this.state.name,
			prize: this.state.prize,
			startDate: this.state.startDate,
			startTime: this.state.startTime
		};

		this.props.createEvent(newEventData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-10 m-auto">
						<h2 className="mt-4 text-center">Create Event</h2>
						{errors.alreadyExists && (
							<p className="text-danger">
								{errors.alreadyExists}
							</p>
						)}
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
								inputId="descriptionInput"
								labelText="Description"
								name="description"
								placeholder="f.eks. 'Gradering for TKD'"
								value={this.state.description}
								onChange={this.onChange}
								error={errors.description}
							/>
							<InputField
								inputId="typeInput"
								labelText="Event type"
								name="eventType"
								placeholder="f.eks. 'Gradering'"
								value={this.state.eventType}
								onChange={this.onChange}
								error={errors.eventType}
							/>
							<InputField
								inputId="startDateInput"
								labelText="Start date"
								name="startDate"
								type="date"
								value={this.state.startDate}
								onChange={this.onChange}
								error={errors.startDate}
							/>
							<InputField
								inputId="startTimeInput"
								labelText="Start time"
								name="startTime"
								value={this.state.startTime}
								onChange={this.onChange}
								error={errors.startTime}
							/>
							<InputField
								inputId="endDateInput"
								labelText="End date"
								name="endDate"
								type="date"
								value={this.state.endDate}
								onChange={this.onChange}
								error={errors.endDate}
							/>
							<InputField
								inputId="endTimeInput"
								labelText="End time"
								name="endTime"
								value={this.state.endTime}
								onChange={this.onChange}
								error={errors.endTime}
							/>
							<InputField
								inputId="prizeInput"
								labelText="Prize"
								name="prize"
								value={this.state.prize}
								onChange={this.onChange}
								error={errors.prize}
							/>
						</form>
						<div className="col-10 m-auto text-center">
							<button
								className="btn btn-dark"
								onClick={this.onSubmit}>
								Create Event
							</button>
						</div>
					</div>
					<div className="col-12 text-center">
						<Link to="/manage-events">
							<button className="btn btn-light mt-2">
								<span className="badge">
									<i className="fas fa-angle-left fa-lg" />
								</span>{' '}
								Back
							</button>
						</Link>
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
