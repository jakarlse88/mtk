import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BackButton from '../common/BackButton';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';

import M from 'materialize-css';

import { auth, db } from '../../firebase';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null
};

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount = () => {
		const elems = document.querySelectorAll('select');
		M.FormSelect.init(elems, {});
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const { history } = this.props;

		const { username, email, passwordOne } = this.state;

		auth
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				// Also create a user in own Firebase DB
				db.doCreateUser(authUser.user.uid, username, email).then(() => {
					this.setState({ ...INITIAL_STATE });
					history.push('/signup-success');
				});
			})
			.catch(err =>
				this.setState({
					error: err
				})
			);
	};

	render() {
		const {
			username,
			email,
			passwordOne,
			passwordTwo,
			error
		} = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2 className="center-align">Ny bruker</h2>
					</div>

					<div className="col s12 left-align">
						<form noValidate onSubmit={this.onSubmit}>
							<InputField
								icon="user"
								inputId="usernameInput"
								value={this.state.username}
								name="username"
								onChange={this.onChange}
								labelText="Navn"
								placeholder="Ola Nordmann"
							/>
							<InputField
								icon="at"
								inputId="emailInput"
								value={this.state.email}
								name="email"
								onChange={this.onChange}
								labelText="E-post"
								placeholder="ola.nordmann@gmail.com"
							/>
							<InputField
								icon="key"
								inputId="passwordInput"
								value={this.state.passwordOne}
								name="passwordOne"
								type="password"
								onChange={this.onChange}
								labelText="Passord"
								placeholder="*****"
							/>
							<InputField
								icon="key"
								inputId="password2Input"
								value={this.state.passwordTwo}
								name="passwordTwo"
								type="password"
								onChange={this.onChange}
								labelText="Bekreft passord"
								placeholder="*****"
							/>

							{error && (
								<div className="row">
									<div className="col s12 center-align">
										<p className="red-text">{error.message}</p>
									</div>
								</div>
							)}

							<div className="row">
								<div className="col s6 right-align">
									<BackButton linkTo="/manage-users" />
								</div>
								<div className="col s6 left-align">
									<SubmitButton
										isInvalid={isInvalid}
										onClick={this.onSubmit}
										buttonText="Send"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SignUp);
