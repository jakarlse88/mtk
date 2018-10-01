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
				<Link
					className="waves-effect waves-dark grey-text text-darken-2"
					to="/login">
					Login
					<i className="right fas fa-user fa-1x" />
				</Link>
			</li>
		);

		const adminLinks = (
			<Fragment>
				<li>
					<Link
						className="waves-effect waves-dark grey-text text-darken-2"
						to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li>
					<a
						href="#!"
						onClick={this.onLogoutClick}
						className="waves-effect waves-dark text-darken-2 grey-text">
						Logout
						<i className="right fas fa-user-slash fa-1x" />
					</a>
				</li>
			</Fragment>
		);

		const infoDropdownContent = (
			<ul id="info-menu-dropdown" className="dropdown-content">
				<li>
					<Link to="/about-club" className="grey-text text-darken-2">
						Om klubben
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/taekwondo">
						Taekwondo
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/hapkido">
						Hapkido
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/jujutsu">
						Brasiliansk Jujutsu
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/thai">
						Muay Thai
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/self-defense">
						Selvforsvar for kvinner
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/schedule">
						Treningstider
					</Link>
				</li>
				<li>
					<Link className="grey-text text-darken-2" to="/pricing">
						Medlemskap & priser
					</Link>
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
						<i className="left fas fa-newspaper fa-1x" />
					</Link>
				</li>
				<li>
					<Link
						to="/events"
						className="collapsible-header"
						onClick={this.onSidenavLinkClick}>
						Arrangementer
						<i className="left fas fa-calendar fa-1x" />
					</Link>
				</li>
				<li>
					<Link
						className="collapsible-header"
						to="/contact"
						onClick={this.onSidenavLinkClick}>
						Kontakt oss
						<i className="left fas fa-envelope fa-1x" />
					</Link>
				</li>
				<li>
					<a href="#" className="collapsible-header">
						Informasjon
						<i className="left fas fa-info-circle fa-1x" />
					</a>
					<div className="collapsible-body">
						<ul>
							<li>
								<Link to="/about-club">
									Om klubben
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/taekwondo">
									Taekwondo
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/hapkido">
									Hapkido
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/jujutsu">
									Brasiliansk Jujutsu
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/thai">
									Muay Thai
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/self-defense">
									Selvforsvar for kvinner
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/schedule">
									Treningstider
									<i className="left fas fa-caret-right fa-1x" />
								</Link>
							</li>
							<li>
								<Link to="/pricing">
									Medlemskap & priser
									<i className="left fas fa-caret-right fa-1x" />
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
							<i className="left fas fa-user fa-sm" />
							Login
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
							</Link>
						</li>
						<li>
							<a
								href="#!"
								className="collapsible-header waves-effect waves-dark"
								onClick={this.onSidenavLogoutClick}>
								Logout
							</a>
						</li>
					</Fragment>
				)}
			</ul>
		);

		return (
			<header>
				<div className="navbar-fixed row">
					<nav className="white black-text">
						<div className="nav-wrapper">
							<div className="col s12">
								<Link
									className="waves-effect grey-text text-darken-3 waves-dark brand-logo"
									to="/">
									<span className="right hide-on-large-only">
										Moss TKD
									</span>
									<span className="hide-on-med-and-down">
										Moss Taekwondo Klubb
									</span>
								</Link>
								<a
									href="#"
									className="sidenav-trigger"
									data-target="mobile-menu">
									<i className="fas fa-bars fa-2x grey-text text-darken-2" />
								</a>
								<ul id="nav-mobile" className="right hide-on-med-and-down">
									<li>
										<Link
											to="/articles"
											className="grey-text text-darken-2 waves-effect waves-dark">
											Nyheter
										</Link>
									</li>
									<li>
										<Link
											to="/events"
											className="waves-effect waves-dark grey-text text-darken-2">
											Arrangementer
										</Link>
									</li>
									<li>
										<Link
											to="/contact"
											className="waves-effect waves-dark grey-text text-darken-2">
											Kontakt oss
										</Link>
									</li>
									<li>
										<a
											href="#"
											className="dropdown-trigger grey-text text-darken-2"
											data-target="info-menu-dropdown">
											Informasjon
											<i className="right fas fa-caret-down fa-1x" />
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
