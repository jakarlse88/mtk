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
			this.props.history.push('/');
			// TODO: dashboard
		}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
			// TODO: dashboard
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

	onSubmit = () => {
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
					<div className="col-8 m-auto">
						<h4 className="text-center mt-4">Login</h4>
						<p className="text-muted text-center">
							Admin/instruktør
						</p>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<input
									value={this.state.email}
									onChange={this.onChange}
									id="loginNameInput"
									type="text"
									name="email"
									placeholder="Brukernavn"
									className="form-control"
								/>
								{errors.email ? (
									<small
										id="emailHelp"
										className="form-text text-danger">
										{errors.email}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<input
									value={this.state.password}
									onChange={this.onChange}
									name="password"
									id="loginPasswordInput"
									type="password"
									placeholder="Passord"
									className="form-control"
								/>
								{errors.password ? (
									<small
										id="passwordHelp"
										className="form-text text-danger">
										{errors.password}
									</small>
								) : null}
							</div>
						</form>
						<button
							className="btn btn-dark mb-4"
							type="submit"
							onClick={this.onSubmit}>
							Login
						</button>
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
