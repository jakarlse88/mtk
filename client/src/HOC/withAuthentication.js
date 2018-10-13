import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { firebase } from '../firebase';
import { setCurrentUser } from '../actions/authActions';

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
			firebase.auth.onAuthStateChanged(
				authUser =>
					authUser
						? this.props.setCurrentUser(authUser)
						: this.props.setCurrentUser(null)
			);
		};

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return WithAuthentication;
};

withAuthentication.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const composedHOC = compose(
	connect(
		mapStateToProps,
		{ setCurrentUser }
	),
	withAuthentication
);

export default composedHOC;
