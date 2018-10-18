import { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setCurrentUser } from '../../actions/authActions';

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

		// Check authUser against authCondition
		if (
			this.props.auth &&
			!authCondition(this.props.auth.authUser)
		) {
			this.props.history.push('/');
		}
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
	connect(
		mapStateToProps,
		{ setCurrentUser }
	),
	withRouter
)(Authorization);
