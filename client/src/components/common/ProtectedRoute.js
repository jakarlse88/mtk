import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*
 * If user is authenticated, load the passed-in component.
 * If user is not authenticated, redirect to /login.
 */
const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);

ProtectedRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
