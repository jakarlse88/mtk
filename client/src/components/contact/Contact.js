import React, { Component } from 'react';

import InputField from '../common/InputField';
export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			subject: '',
			message: ''
		};
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		const newMsg = {
			name: this.state.name,
			email: this.state.email,
			subject: this.state.subject,
			message: this.state.message
		};

		console.log(newMsg);
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<h2 className="center-align">Kontakt oss</h2>
					<div className="col s12">
						<form onSubmit={this.onSubmit}>
							<InputField
								icon="user-circle"
								id="nameInput"
								value={this.state.name}
								name="name"
								type="text"
								onChange={this.onChange}
								labelText="Navn"
								placeholder="Ola Nordmann"
							/>
							<InputField
								icon="at"
								id="emailInput"
								value={this.state.email}
								name="email"
								type="text"
								onChange={this.onChange}
								labelText="E-post"
								placeholder="ola.nordmann@gmail.com"
							/>
							<InputField
								icon="question-circle"
								id="subjectInput"
								value={this.state.subject}
								name="subject"
								type="text"
								onChange={this.onChange}
								labelText="Emne"
								placeholder="Ang. trening"
							/>
							<div className="input-field">
								<i className="prefix fas fa-edit" />
								<textarea
									onChange={this.onChange}
									value={this.state.message}
									name="message"
									id="textArea"
									cols="30"
									rows="10"
									className="materialize-textarea"
								/>
								<span className="helper-text black-text">Melding</span>
								{/* {errors.message && <small className="red-text">error</small>} */}
							</div>
							<div className="row">
								<div className="col s12 center-align">
									<button
										type="submit"
										onClick={this.onSubmit}
										className="btn blue waves-effect waves-blue">
										<i className="right fas fa-chevron-circle-right" />
										Send
									</button>
								</div>
							</div>
						</form>
						<div className="row">
							<div className="col" />
						</div>
						<p className="center-align">
							Vi gjør vårt beste for å besvare deg så raskt som mulig. Har
							du ikke hørt noe innen noen dager og det haster ber vi deg ta
							kontakt med oss direkte via telefon istedet.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
