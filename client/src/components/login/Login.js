import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount = () => {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

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

		const loginData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(loginData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2 center-align">
						<h2>Login</h2>
						<p className="grey-text">Admin/instruktør</p>
						<form onSubmit={this.onSubmit}>
							<div className="input-field left-align">
								<i className="prefix fas fa-user-circle" />
								<input
									value={this.state.email}
									onChange={this.onChange}
									id="loginNameInput"
									type="text"
									name="email"
								/>
								<span className="helper-text">E-post</span>
								{errors.email ? (
									<span id="emailHelp" className="helper-text red-text">
										{errors.email}
									</span>
								) : null}
							</div>
							<div className="input-field left-align">
								<i className="prefix fas fa-key" />
								<input
									value={this.state.password}
									onChange={this.onChange}
									name="password"
									id="loginPasswordInput"
									type="password"
									className="form-control"
								/>
								<span className="helper-text">Passord</span>
								{errors.password ? (
									<span id="passwordHelp" className="helper-text red-text">
										{errors.password}
									</span>
								) : null}
							</div>
							<p className="text-center">
								<button
									className="btn-large blue waves-effect waves-dark"
									type="submit"
									onClick={this.onSubmit}>
									Login
									<i className="right fas fa-unlock-alt" />
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login));
