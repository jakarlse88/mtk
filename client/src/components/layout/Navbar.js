import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import M from 'materialize-css';

import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
	componentDidMount = () => {
		let elem = document.querySelector('.sidenav');
		let instance = M.Sidenav.init(elem, {
			edge: 'left'
		});
	};

	onLogoutClick = e => {
		e.preventDefault();

		this.props.logoutUser(this.props.history);
	};

	onSidenavLinkClick = () => {
		const elem = document.querySelector('.sidenav');
		let instance = M.Sidenav.getInstance(elem);
		instance.close();
	};

	onSidenavLogoutClick = () => {
		const elem = document.querySelector('.sidenav');
		let instance = M.Sidenav.getInstance(elem);
		instance.close();

		this.props.logoutUser(this.props.history);
	};

	render() {
		const { isAuthenticated } = this.props.auth;

		const visitorLinks = (
			<li>
				<Link className="waves-effect waves-dark" to="/login">
					Login
					<i className="right material-icons">person</i>
				</Link>
			</li>
		);

		const adminLinks = (
			<Fragment>
				<li>
					<Link className="waves-effect waves-dark" to="/dashboard">
						Dashboard
						<i className="right material-icons">dashboard</i>
					</Link>
				</li>
				<li>
					<a
						href="#!"
						onClick={this.onLogoutClick}
						className="waves-effect waves-dark">
						Logout
						<i className="right material-icons">clear</i>
					</a>
				</li>
			</Fragment>
		);

		const infoDropdownContent = (
			<ul id="info-menu-dropdown" className="dropdown-content">
				<li>
					<Link to="/about-club">Om klubben</Link>
				</li>
				<li>
					<Link to="/taekwondo">Taekwondo</Link>
				</li>
				<li>
					<Link to="/hapkido">Hapkido</Link>
				</li>
				<li>
					<Link to="/jujutsu">Brasiliansk Jujutsu</Link>
				</li>
				<li>
					<Link to="/thai">Muay Thai</Link>
				</li>
				<li>
					<Link to="/self-defense">Selvforsvar for kvinner</Link>
				</li>
				<li>
					<Link to="/schedule">Treningstider</Link>
				</li>
				<li>
					<Link to="/pricing">Medlemskap & priser</Link>
				</li>
			</ul>
		);

		const sidenavContent = (
			<ul className="sidenav collapsible" id="mobile-menu">
				<li>
					<Link
						to="/articles"
						className="collapsible-header"
						onClick={this.onSidenavLinkClick}>
						Nyheter
						<i className="left material-icons">subject</i>
					</Link>
				</li>
				<li>
					<Link
						to="/events"
						className="collapsible-header"
						onClick={this.onSidenavLinkClick}>
						Arrangementer
						<i className="left material-icons">event</i>
					</Link>
				</li>
				<li>
					<Link
						className="collapsible-header"
						to="/contact"
						onClick={this.onSidenavLinkClick}>
						Kontakt oss
						<i className="left material-icons">mail_outline</i>
					</Link>
				</li>
				<li>
					<a href="#" className="collapsible-header">
						Informasjon
						<i className="material-icons left">arrow_drop_down</i>
					</a>
					<div className="collapsible-body">
						<ul>
							<li>
								<Link to="/about-club">
									Om klubben
									<i className="left material-icons">arrow_right </i>
								</Link>
							</li>
							<li>
								<Link to="/taekwondo">
									Taekwondo
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/hapkido">
									Hapkido
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/jujutsu">
									Brasiliansk Jujutsu
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/thai">
									Muay Thai
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/self-defense">
									Selvforsvar for kvinner
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/schedule">
									Treningstider
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
							<li>
								<Link to="/pricing">
									Medlemskap & priser
									<i className="left material-icons">arrow_right</i>
								</Link>
							</li>
						</ul>
					</div>
				</li>
				{!isAuthenticated && (
					<li>
						<Link
							className="collapsible-header"
							to="/login"
							onClick={this.onSidenavLinkClick}>
							Login
							<i className="left material-icons">person</i>
						</Link>
					</li>
				)}
				{isAuthenticated && (
					<Fragment>
						<li>
							<Link
								className="collapsible-header"
								to="/dashboard"
								onClick={this.onSidenavLinkClick}>
								Dashboard
								<i className="left material-icons">dashboard</i>
							</Link>
						</li>
						<li>
							<a
								href="#!"
								className="collapsible-header waves-effect waves-dark"
								onClick={this.onSidenavLogoutClick}>
								Logout
								<i className="left material-icons">clear</i>
							</a>
						</li>
					</Fragment>
				)}
			</ul>
		);

		return (
			<header>
				<div className="navbar-fixed row">
					<nav className="red darken-2">
						<div className="nav-wrapper">
							<div className="col s12">
								<Link
									className="waves-effect waves-dark brand-logo"
									to="/">
									Moss Taekwondo Klubb
								</Link>
								<a
									href="#"
									className="sidenav-trigger"
									data-target="mobile-menu">
									<i className="material-icons">menu</i>
								</a>
								<ul id="nav-mobile" className="right hide-on-med-and-down">
									<li>
										<Link
											to="/articles"
											className="waves-effect waves-dark">
											Nyheter
											<i className="right material-icons">subject</i>
										</Link>
									</li>
									<li>
										<Link to="/events" className="waves-effect waves-dark">
											Arrangementer
											<i className="right material-icons">event</i>
										</Link>
									</li>
									<li>
										<Link
											to="/contact"
											className="waves-effect waves-dark">
											Kontakt oss
											<i className="right material-icons">mail_outline</i>
										</Link>
									</li>
									<li>
										<a
											href="#"
											className="dropdown-trigger"
											data-target="info-menu-dropdown">
											Informasjon
											<i className="material-icons right">
												arrow_drop_down
											</i>
										</a>
									</li>
									{!isAuthenticated && visitorLinks}
									{isAuthenticated && adminLinks}
								</ul>
							</div>
						</div>
					</nav>
				</div>
				{infoDropdownContent}
				{sidenavContent}
			</header>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(Navbar));
