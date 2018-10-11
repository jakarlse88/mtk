import React, { Component } from 'react';
import { link } from 'react-router-dom';

import InputField from '../common/InputField';

import { auth } from '../../firebase';

const INITIAL_STATE = {
	email: '',
	error: null
};

export default class PasswordForgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		const { email } = this.state;

		auth
			.doResetPassword(email)
			.then(() => this.setState({ ...INITIAL_STATE }))
			.catch(err => this.setState({ error: err }));

		e.preventDefault();
	};

	render() {
		const { email, error } = this.state;
		const isInvalid = email === '';

		return (
			<form noValidate onSubmit={this.onSubmit}>
				<div className="col s12 m6 offset-m3">
					<InputField
						icon="at"
						inputId="emailInput"
						name="email"
						onChange={this.onChange}
						placeholder="ola@nordmann.no"
						type="email"
						value={email}
					/>
				</div>
				<div className="col s12 center-align">
					<button
						className="btn blue waves-effect waves-dark"
						disabled={isInvalid}>
						<i className="fas fa-paper-plane right" />
						Nulstill password
					</button>
				</div>
				<div className="col s12">
					<p className="center-align">{error && error.message}</p>
				</div>
			</form>
		);
	}
}
