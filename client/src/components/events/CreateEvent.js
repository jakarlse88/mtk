import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Authorization from '../common/Authorization';
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
					schedule: 'Dato må spesifiseres'
				}
			});

			return;
		}

		if (isEmpty(scheduleContentBuffer)) {
			this.setState({
				errors: {
					schedule: 'Innhold må spesifiseres'
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
			scheduleContentBuffer: ''
		});
	};

	render() {
		const { errors } = this.state;

		return (
			<Authorization authCondition={authUser => !!authUser}>
				{() => (
					<div className="container">
						<div className="row center-align">
							<div className="col s12">
								<h2>Opprett Arrangement</h2>
								{errors.alreadyExists && (
									<p className="red-text">{errors.alreadyExists}</p>
								)}

								<form
									onSubmit={this.onSubmit}
									noValidate
									className="left-align">
									<InputField
										inputId="nameInput"
										labelText="Navn på arrangement"
										name="name"
										placeholder="f. eks. 'Vintergradering 2018"
										value={this.state.name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<InputField
										inputId="eventGroupInput"
										labelText="Gruppe"
										name="eventGroup"
										placeholder="Taekwondo, hapkido, jujutsu, muay thai, or self defense"
										value={this.state.eventGroup}
										onChange={this.onChange}
										error={errors.eventGroup}
									/>
									<div className="row">
										<div className="col s8">
											<InputField
												inputId="typeInput"
												labelText="Arrangementstype"
												name="eventType"
												placeholder="f.eks. gradering, seminar, sosialt"
												value={this.state.eventType}
												onChange={this.onChange}
												error={errors.eventType}
											/>
										</div>
										<div className="col s4">
											<InputField
												inputId="prizeInput"
												labelText="Pris"
												name="prize"
												value={this.state.prize}
												onChange={this.onChange}
												error={errors.prize}
											/>
										</div>
									</div>
									<div className="input-field">
										<textarea
											className="materialize-textarea"
											name="description"
											placeholder="f.eks. 'Gradering for TKD'"
											id="descriptionInput"
											value={this.state.description}
											onChange={this.onChange}
										/>
										<span className="helper-text">
											Arrangementsbeskrivelse
										</span>
										{errors.description && (
											<small className="red-text">
												{errors.description}
											</small>
										)}
									</div>
									<div className="row">
										<div className="col s12">
											<h4 className="center-align">Timeplan</h4>
										</div>
									</div>
									<div className="input-field">
										<div className="row">
											<div className="col s12 m2">
												<input
													name="scheduleDateBuffer"
													type="date"
													id="scheduleDateInput"
													value={this.state.scheduleDateBuffer}
													onChange={this.onChange}
												/>
												<small className="helper-text">Dato</small>
											</div>
											<div className="col s11 m9">
												<input
													placeholder="10:00-11:30 -- Gibon jase"
													type="text"
													id="scheduleContentInput"
													value={this.state.scheduleContentBuffer}
													onChange={this.onChange}
													name="scheduleContentBuffer"
												/>
												<small className="helper-text">Innhold</small>
											</div>
											<div className="col s1">
												<button
													type="button"
													className="btn darken-2 green"
													onClick={this.onScheduleItemAdd}>
													<i className="fas fa-plus" />
												</button>
											</div>
											{errors.schedule && (
												<div className="red-text col s12">
													{errors.schedule}
												</div>
											)}
											<div className="row">
												<div className="col s12" />
											</div>
											<div className="row">
												{this.state.schedule.length > 0 && (
													<div className="col s12">
														Forhåndsvisning timeplan: <br />
														<ul className="grey-text">
															{this.state.schedule.map((item, index) => (
																<li key={index}>
																	{item.date}: {item.content}
																</li>
															))}
														</ul>
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="col waves-effect waves-dark s6 right-align">
										<Link to="/manage-events">
											<button className="btn grey">
												<i className="left fas fa-arrow-left" />
												Tilbake
											</button>
										</Link>
									</div>
									<div className="col waves-effect waves-dark s6 left-align">
										<button className="btn blue" onClick={this.onSubmit}>
											<i className="right fas fa-paper-plane" />
											Opprett Arrangement
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</Authorization>
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
