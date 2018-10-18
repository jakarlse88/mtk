import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		const { history } = this.props;
		const { email, password } = this.state;
		const loginData = { email, password };

		this.props.loginUser(loginData, history);

		e.preventDefault();
	};

	render() {
		const { email, password } = this.state;

		const isInvalid = email === '' || password === '';

		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2 center-align">
						<h2>Innlogging</h2>
						<p className="grey-text">Admin/instruktør</p>
						<form onSubmit={this.onSubmit}>
							<div className="input-field left-align">
								<i className="prefix fas fa-user-circle" />
								<input
									value={email}
									onChange={this.onChange}
									id="signinEmailInput"
									name="email"
								/>
								<span className="helper-text">E-post</span>
							</div>
							<div className="input-field left-align">
								<i className="prefix fas fa-key" />
								<input
									value={password}
									onChange={this.onChange}
									name="password"
									id="signinPasswordInput"
									type="password"
									className="form-control"
								/>
							</div>
							<p className="text-center">
								<button
									disabled={isInvalid}
									className="btn blue waves-effect waves-dark"
									type="submit"
									onClick={this.onSubmit}>
									Logg inn
									<i className="right fas fa-unlock-alt" />
								</button>
							</p>
							<p className="text-center flow-text">
								<Link to="/signup">Ny bruker</Link>
							</p>
							<p className="text-center">
								<Link to="/password-forget">Glemt passord?</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	withRouter,
	connect(
		null,
		{ loginUser }
	)
)(SignIn);
