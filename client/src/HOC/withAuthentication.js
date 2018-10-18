import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { logoutUser, setAuthUser } from '../actions/authActions';

const INITIAL_STATE = {
	authUser: null
};

const withAuthentication = WrappedComponent => {
	class WithAuthentication extends Component {
		constructor(props) {
			super(props);

			this.state = { ...INITIAL_STATE };
		}

		componentDidMount = () => {
			// Check for token
			if (localStorage.jwtToken) {
				// Set Authorization header to auth token
				setAuthToken(localStorage.jwtToken);

				// Decode token, get user info
				const decodedUser = jwt_decode(localStorage.jwtToken);

				// Set user, isAuthenticated
				this.props.setAuthUser(decodedUser);

				// Check for expired token
				const currentTime = Date.now() / 1000;
				if (decodedUser.exp < currentTime) {
					this.props.logoutUser();

					// Redirect to front page
					window.location.href = '/';
				}
			}
		};

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return WithAuthentication;
};

withAuthentication.propTypes = {
	auth: PropTypes.object.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const composedHOC = compose(
	connect(
		mapStateToProps,
		{ logoutUser, setAuthUser }
	),
	withAuthentication
);

export default composedHOC;
