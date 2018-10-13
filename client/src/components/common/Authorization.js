import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';

const INITIAL_STATE = {
	authUser: null
};

class Authorization extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount = () => {
		const { authCondition } = this.props;

		firebase.auth.onAuthStateChanged(authUser => {
			if (!authCondition(authUser)) {
				this.props.history.push('/signin');
			}
		});
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth) {
			this.setState({ authUser: nextProps.auth.authUser });
		}
	};

	render() {
		return this.props.children({ authUser: this.state.authUser });
	}
}

Authorization.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default compose(
	connect(mapStateToProps),
	withRouter
)(Authorization);
