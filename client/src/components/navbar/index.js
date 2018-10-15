import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import CommonLinks from './CommonLinks';
import InfoDropdownContent from './InfoDropdownContent';
import SideNavContent from './SideNavContent';

import { auth } from '../../firebase';

import M from 'materialize-css';

const INITIAL_STATE = {
	authUser: null
};

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount = () => {
		let elem = document.querySelector('.sidenav');
		M.Sidenav.init(elem, {
			edge: 'left'
		});
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth) {
			this.setState({
				authUser: nextProps.auth.authUser
			});
		}
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
		const { authUser } = this.state;

		return (
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
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default compose(
	withRouter,
	connect(mapStateToProps)
)(Navbar);