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

		if (this.props.auth) {
			this.setState({ authUser: this.props.auth.authUser });
		}

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
		const { authUser } = this.state;

		return !!authUser ? this.props.children({ authUser }) : null;
	}
}

Authorization.propTypes = {
	auth: PropTypes.object.isRequired,
	authCondition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default compose(
	connect(mapStateToProps),
	withRouter
)(Authorization);
