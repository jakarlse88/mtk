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
			eventGroup: '',
			eventType: '',
			owner: '',
			name: '',
			prize: '',
			startDate: ''
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
			endDate: this.state.endDate,
			eventType: this.state.eventType,
			owner: this.props.auth.user.name,
			name: this.state.name,
			prize: this.state.prize,
			startDate: this.state.startDate
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
								inputId="eventGroupInput"
								labelText="Event group"
								name="eventGroup"
								placeholder="Taekwondo, hapkido, jujutsu, muay thai, or self defense"
								value={this.state.eventGroup}
								onChange={this.onChange}
								error={errors.eventGroup}
							/>

							<InputField
								inputId="typeInput"
								labelText="Event type"
								name="eventType"
								placeholder="Grading, seminar, or social"
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
								inputId="endDateInput"
								labelText="End date"
								name="endDate"
								type="date"
								value={this.state.endDate}
								onChange={this.onChange}
								error={errors.endDate}
							/>
							<InputField
								inputId="prizeInput"
								labelText="Prize"
								name="prize"
								value={this.state.prize}
								onChange={this.onChange}
								error={errors.prize}
							/>
							<div className="form-group">
								<label htmlFor="descriptionInput">
									Description:
								</label>
								<textarea
									className="form-control"
									name="description"
									placeholder="f.eks. 'Gradering for TKD'"
									id="descriptionInput"
									value={this.state.description}
									onChange={this.onChange}
								/>
								{errors.description && (
									<div className="text-danger">
										{errors.description}
									</div>
								)}
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
