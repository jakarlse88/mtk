import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer-copyright">
				<div className="container">
					<p className="grey-text center-align">
						Copyright &copy; {new Date().getFullYear()}{' '}
						<a
							href="https://github.com/jakarlse88"
							target="_blank"
							rel="noopener noreferrer">
							Jon Karlsen
						</a>
					</p>
				</div>
			</footer>
		);
	}
}
