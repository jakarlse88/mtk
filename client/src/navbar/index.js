import { Link, withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import InfoDropdownContent from './InfoDropdownContent';
import SideNavContent from './SideNavContent';

import { auth } from '../firebase';

import AuthUserContext from '../components/context/AuthUserContext';

import M from 'materialize-css';
import CommonLinks from './CommonLinks';

/*
 * TODO: Links to register should now go to /sign-up
 * TODO: Refactor login to signup/login
 */

class Navbar extends Component {
	componentDidMount = () => {
		let elem = document.querySelector('.sidenav');
		M.Sidenav.init(elem, {
			edge: 'left'
		});
	};

	onLogoutClick = e => {
		e.preventDefault();

		auth.doSignOut();
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

		auth.doSignOut();
	};

	render() {
		const { authUser } = this.props;

		return (
			<AuthUserContext.Consumer>
				{authUser => (
					<header>
						<div className="navbar-fixed row">
							<nav className="white black-text">
								<div className="nav-wrapper">
									<div className="col s12">
										<Link
											className="waves-effect grey-text text-darken-3 waves-blue brand-logo"
											to="/">
											<span className="right hide-on-large-only">
												Moss TKD
											</span>
											<span className="hide-on-med-and-down">
												Moss Taekwondo Klubb
											</span>
										</Link>
										<CommonLinks authUser={authUser} />
									</div>
								</div>
							</nav>
						</div>
						<InfoDropdownContent />
						<SideNavContent
							onSidenavLinkClick={this.onSidenavLinkClick}
							onSidenavLogoutClick={this.onSidenavLogoutClick}
						/>
					</header>
				)}
			</AuthUserContext.Consumer>
		);
	}
}

export default withRouter(Navbar);
