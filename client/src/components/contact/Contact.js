import React, { Component } from 'react';

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
							<div className="input-field">
								<i className="prefix fas fa-user-circle" />
								<label htmlFor="nameInput">Navn</label>
								<input
									id="nameInput"
									value={this.state.name}
									name="name"
									type="text"
									onChange={this.onChange}
								/>
							</div>
							<div className="input-field">
								<i className="prefix fas fa-at" />
								<label htmlFor="emailInput">E-post</label>
								<input
									id="emailInput"
									value={this.state.email}
									name="email"
									type="text"
									onChange={this.onChange}
								/>
							</div>
							<div className="input-field">
								<i className="prefix fas fa-question-circle" />
								<label htmlFor="subjectInput">Emne</label>
								<input
									id="subjectInput"
									value={this.state.subject}
									name="subject"
									type="text"
									onChange={this.onChange}
								/>
							</div>
							<div className="input-field">
								<i className="prefix fas fa-edit" />
								<label htmlFor="textArea">Din melding:</label>
								<textarea
									onChange={this.onChange}
									name="message"
									id="textArea"
									cols="30"
									rows="10"
									className="materialize-textarea"
								/>
							</div>
							<div className="row">
								<div className="col s12 center-align">
									<button
										type="submit"
										onClick={this.onSubmit}
										className="btn green darken-2 waves-effect waves-dark">
										<i className="right fas fa-chevron-circle-right" />
										Send
									</button>
								</div>
							</div>
						</form>
						<p className="center-align grey-text">
							Vi gjør vårt beste for å besvare deg så raskt som mulig.Har
							du ikke hørt noe innen noen dager og det haster ber vi deg ta
							kontakt med oss direkte via telefon istedet.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
