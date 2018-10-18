import React, { Component } from 'react';

import InputField from '../common/InputField';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null
};

export default class PasswordUpdateForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	// onSubmit = e => {
	// 	const { passwordOne } = this.state;

	// 	auth
	// 		.doUpdatePassword(passwordOne)
	// 		.then(() => this.setState({ INITIAL_STATE }))
	// 		.catch(error => this.setState({ error }));

	// 	e.preventDefault();
	// };

	render() {
		const { passwordOne, passwordTwo, error } = this.state;
		const isInvalid = passwordOne === '' || passwordOne !== passwordTwo;

		return (
			<form noValidate onSubmit={this.onSubmit}>
				<div className="col s12 m6 offset-m3 center-align">
					<InputField
						icon="lock"
						inputId="passwordOneInput"
						name="passwordOne"
						onChange={this.onChange}
						type="password"
						value={passwordOne}
					/>
				</div>

				<div className="col s12 m6 offset-m3 center-align">
					<InputField
						icon="lock"
						inputId="passwordTwoInput"
						name="passwordTwo"
						onChange={this.onChange}
						type="password"
						value={passwordTwo}
					/>
				</div>

				<div className="col s12 center-align">
					<button
						className="btn blue waves-effect waves-dark"
						disabled={isInvalid}
						type="submit">
						<i className="fas fa-paper-plane right" />
						Oppdatér passord
					</button>
				</div>

				{error && (
					<div className="col s12">
						<p className="text-center">{error.message}</p>
					</div>
				)}
			</form>
		);
	}
}
