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
				<div className="col-12 m-auto text-center">
					<h2 className="mt-4">Hello, {this.props.auth.user.name}!</h2>
					<p className="lead text-center">
						Unfortunately, this functionality requires administrator
						privileges.
					</p>
					<p className="text-center">
						<Link to="/dashboard">Return to dashboard?</Link>
					</p>
				</div>
			);
		} else {
			content = (
				<Fragment>
					<div className="col-12 m-auto">
						<h2 className="display-4 mt-4 text-center">
							User Registration
						</h2>
						<hr />
					</div>
					<div className="col-8 m-auto">
						<form noValidate onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="emailInput">E-mail:</label>
								<input
									aria-describedby="emailHelp"
									className="form-control"
									id="emailInput"
									name="email"
									onChange={this.onChange}
									placeholder="E-post"
									type="text"
									value={this.state.email}
								/>
								{errors.email ? (
									<small id="emailHelp" className="form-text text-danger">
										{errors.email}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="nameInput">Name:</label>
								<input
									aria-describedby="nameHelp"
									className="form-control"
									id="nameInput"
									name="name"
									onChange={this.onChange}
									placeholder="Fullt navn"
									type="text"
									value={this.state.name}
								/>
								{errors.name ? (
									<small id="nameHelp" className="form-text text-danger">
										{errors.name}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="passwordInput">Password:</label>
								<input
									aria-describedby="passwordHelp"
									className="form-control"
									id="passwordInput"
									name="password"
									onChange={this.onChange}
									placeholder="Password"
									type="password"
									value={this.state.password}
								/>
								{errors.password ? (
									<small
										id="passwordHelp"
										className="form-text text-danger">
										{errors.password}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="password2Input">Confirm password:</label>
								<input
									aria-describedby="password2Help"
									className="form-control"
									id="password2Input"
									name="password2"
									onChange={this.onChange}
									placeholder="Confirm password"
									type="password"
									value={this.state.password2}
								/>
								{errors.password2 ? (
									<small
										id="password2Help"
										className="form-text text-danger">
										{errors.password2}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="sauceInput">Saus:</label>
								<input
									aria-describedby="sauceHelp"
									className="form-control"
									id="sauceInput"
									name="sauce"
									onChange={this.onChange}
									placeholder="Saus"
									type="password"
									value={this.state.sauce}
								/>
								{errors.sauce ? (
									<small id="sauceHelp" className="form-text text-danger">
										{errors.sauce}
									</small>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="roleInput">Role:</label>
								<input
									aria-describedby="roleHelp"
									className="form-control"
									id="roleInput"
									name="role"
									onChange={this.onChange}
									placeholder="Role"
									type="text"
									value={this.state.role}
								/>
								{errors.role ? (
									<small id="roleHelp" className="form-text text-danger">
										{errors.role}
									</small>
								) : null}
							</div>
							<p className="text-center">
								<Link to="/manage-users">
									<button
										className="btn btn-secondary mr-4 mt-4 mb-4"
										type="button">
										<span className="badge">
											<i className="fas fa-arrow-left" />
										</span>
										Back
									</button>
								</Link>
								<button
									className="btn btn-success mt-4 mb-4"
									type="submit"
									onClick={this.onSubmit}>
									Send Registration
								</button>
							</p>
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
