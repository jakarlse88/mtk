import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import InputField from '../common/InputField';

import M from 'materialize-css';

import { auth } from '../../firebase';

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

	componentWillReceiveProps = nextProps => {
		// if (nextProps.errors) {
		// 	this.setState({
		// 		errors: nextProps.errors
		// 	});
		// }
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
				this.setState({ ...INITIAL_STATE });
				history.push('/sign-up-success');
			})
			.catch(err =>
				this.setState({
					error: err
				})
			);
	};

	render() {
		const { history } = this.props;

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
						<h2 className="center-align">Opprett Bruker</h2>
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
									<button
										disabled={isInvalid}
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
				</div>
			</div>
		);
	}
}

export default withRouter(SignUp);
