import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			name: '',
			password: '',
			password2: '',
			role: '',
			sauce: '',
			errors: {}
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

		const newUserData = {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password,
			password2: this.state.password2,
			sauce: this.state.sauce,
			role: this.state.role
		};

		this.props.registerUser(newUserData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		let content;

		if (this.props.auth.user && this.props.auth.user.role !== 'admin') {
			content = (
				<div className="col s12 center-align">
					<h2>Hello, {this.props.auth.user.name}!</h2>
					<p className="center-align flow-text">
						Unfortunately, this functionality requires administrator
						privileges.
					</p>
					<p className="center-align">
						<Link to="/dashboard">Return to dashboard?</Link>
					</p>
				</div>
			);
		} else {
			content = (
				<Fragment>
					<div className="col s12 center-align">
						<h2 className="center-align">User Registration</h2>
					</div>
					<div className="col s12 center-align">
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field">
								<i className="prefix fas fa-at" />
								<input
									placeholder="name@address.com"
									aria-describedby="emailHelp"
									id="emailInput"
									name="email"
									onChange={this.onChange}
									type="text"
									value={this.state.email}
								/>
								<span className="helper-text left-align">E-post</span>
								{errors.email ? (
									<small
										id="emailHelp"
										className="helper-text left-align red-text">
										{errors.email}
									</small>
								) : null}
							</div>
							<div className="input-field">
								<i className="prefix fas fa-user" />
								<input
									aria-describedby="nameHelp"
									id="nameInput"
									name="name"
									onChange={this.onChange}
									placeholder="Ola Nordmann"
									type="text"
									value={this.state.name}
								/>
								<span className="helper-text left-align">Navn</span>
								{errors.name ? (
									<small
										id="nameHelp"
										className="helper-text red-text left-align">
										{errors.name}
									</small>
								) : null}
							</div>
							<div className="input-field">
								<i className="prefix fas fa-key" />
								<input
									aria-describedby="passwordHelp"
									id="passwordInput"
									name="password"
									onChange={this.onChange}
									placeholder="*****"
									type="password"
									value={this.state.password}
								/>
								<span className="helper-text left-align">Passord</span>
								{errors.password ? (
									<small
										id="passwordHelp"
										className="helper-text red-text left-align">
										{errors.password}
									</small>
								) : null}
							</div>
							<div className="input-field">
								<i className="prefix fas fa-key" />
								<input
									aria-describedby="password2Help"
									id="password2Input"
									name="password2"
									onChange={this.onChange}
									placeholder="*****"
									type="password"
									value={this.state.password2}
								/>
								<span className="helper-text left-align">
									Bekreft passord
								</span>
								{errors.password2 ? (
									<small
										id="password2Help"
										className="helper-text red-text left-align">
										{errors.password2}
									</small>
								) : null}
							</div>
							<div className="input-field">
								<i className="prefix fas fa-question" />
								<input
									aria-describedby="sauceHelp"
									id="sauceInput"
									name="sauce"
									onChange={this.onChange}
									placeholder="Saus"
									type="password"
									value={this.state.sauce}
								/>
								<span className="helper-text left-align">Saus</span>
								{errors.sauce ? (
									<small
										id="sauceHelp"
										className="helper-text left-align red-text">
										{errors.sauce}
									</small>
								) : null}
							</div>
							<div className="input-field">
								<i className="prefix fas fa-user-cog" />
								<input
									aria-describedby="roleHelp"
									className="form-control"
									id="roleInput"
									name="role"
									onChange={this.onChange}
									placeholder="Admin"
									type="text"
									value={this.state.role}
								/>
								<span className="helper-text left-align">Rolle</span>
								{errors.role ? (
									<small
										id="roleHelp"
										className="helper-text left-align red-text">
										{errors.role}
									</small>
								) : null}
							</div>
							<div className="row">
								<div className="col s6 right-align">
									{' '}
									<Link to="/manage-users">
										<button
											className="btn grey waves-effect waves-dark"
											type="button">
											<i className="fas fa-arrow-left left" />
											Back
										</button>
									</Link>
								</div>
								<div className="col s6 left-align">
									{' '}
									<button
										className="btn blue waves-effect waves-blue"
										type="submit"
										onClick={this.onSubmit}>
										<i className="fas fa-share-square right" />
										Send Registration
									</button>
								</div>
							</div>
						</form>
					</div>
				</Fragment>
			);
		}

		return (
			<div className="container">
				<div className="row">{content}</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
