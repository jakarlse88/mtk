import React, { Component } from 'react';

import CardDeck from '../common/CardDeck';
import Jumbotron from '../common/Jumbotron';

export default class Landing extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12 ">
						<Jumbotron />
						<div className="divider" />
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						<CardDeck />
					</div>
				</div>
			</div>
		);
	}
}
