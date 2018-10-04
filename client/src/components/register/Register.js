import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import InputField from '../common/InputField';

import M from 'materialize-css';

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
			errors: {}
		};
	}

	componentDidMount = () => {
		const elems = document.querySelectorAll('select');
		M.FormSelect.init(elems, {});
	};

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
						Denne funksjonaliteten er forbeholdt brukere med
						administrator-nivå.
					</p>
					<p className="center-align">
						<Link to="/dashboard">Tilbake til kontrollpanel?</Link>
					</p>
				</div>
			);
		} else {
			content = (
				<Fragment>
					<div className="col s12 center-align">
						<h2 className="center-align">Opprett Bruker</h2>
					</div>
					<div className="col s12 left-align">
						<form noValidate onSubmit={this.onSubmit}>
							<InputField
								icon="at"
								inputId="emailInput"
								value={this.state.email}
								name="email"
								type="text"
								onChange={this.onChange}
								labelText="E-post"
								placeholder="ola.nordmann@gmail.com"
								error={errors.email}
							/>
							<InputField
								icon="user"
								inputId="nameInput"
								value={this.state.name}
								name="name"
								type="text"
								onChange={this.onChange}
								labelText="Navn"
								placeholder="Ola Nordmann"
								error={errors.name}
							/>
							<InputField
								icon="key"
								inputId="passwordInput"
								value={this.state.password}
								name="password"
								type="password"
								onChange={this.onChange}
								labelText="Passord"
								placeholder="*****"
								error={errors.password}
							/>
							<InputField
								icon="key"
								inputId="password2Input"
								value={this.state.password2}
								name="password2"
								type="password"
								onChange={this.onChange}
								labelText="Bekreft passord"
								placeholder="*****"
								error={errors.password2}
							/>

							<div className="input-field">
								<i className="prefix fas fa-user-cog" />
								<select
									className="grey-text"
									value={this.state.role}
									onChange={this.onChange}
									name="role">
									<option value="" disabled defaultValue>
										Velg...
									</option>
									<option className="grey-text" value="admin">
										Admin
									</option>
									<option className="grey-text" value="mod">
										Moderator
									</option>
									<option className="grey-text" value="asst">
										Assistent
									</option>
								</select>
								<span className="helper-text black-text left-align">
									Rolle
								</span>
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
											Tilbake
										</button>
									</Link>
								</div>
								<div className="col s6 left-align">
									{' '}
									<button
										className="btn blue waves-effect waves-blue"
										type="submit"
										onClick={this.onSubmit}>
										<i className="fas fa-paper-plane right" />
										Send
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
