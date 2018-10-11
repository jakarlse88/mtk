import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';

import AuthUserContext from '../context/AuthUserContext';

const withAuthorization = authCondition => WrappedComponent => {
	class WithAuthorization extends Component {
		componentDidMount = () => {
			firebase.auth.onAuthStateChanged(authUser => {
				if (!authCondition(authUser)) {
					this.props.history.push('/signin');
				}
			});
		};

		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser =>
						authUser ? <WrappedComponent {...this.props} /> : null
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	return withRouter(WithAuthorization);
};

export default withAuthorization;
