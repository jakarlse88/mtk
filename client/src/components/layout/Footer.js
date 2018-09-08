import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className="container text-center">
					<small className="text-muted">
						Copyright &copy; {new Date().getFullYear()} Moss
						Taekwondo Klubb
					</small>
					<br />
					<small className="text-muted">
						Made with{' '}
						<i className="fas fa-heart fa-sm text-danger" /> &{' '}
						<i className="fas fa-coffee fa-sm text-dark" /> by{' '}
						<a
							href="https://github.com/jakarlse88"
							target="_blank"
							rel="noopener noreferrer">
							Jon Karlsen
						</a>
					</small>
				</div>
			</footer>
		);
	}
}
