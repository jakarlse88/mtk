import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { setUsers } from '../../actions/authActions';

import Authorization from '../common/Authorization';

const INITIAL_STATE = {
	users: null
};

class ListUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};
	}

	componentDidMount = () => {
		this.props.setUsers();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth.users) {
			this.setState({
				users: nextProps.auth.users
			});
		}
	};

	render() {
		const { users } = this.state;

		return (
			<Authorization authCondition={authUser => !!authUser}>
				{() => (
					<div className="container">
						<div className="row">
							<div className="col s12 center-align">
								<h2>List users</h2>
							</div>
						</div>
						<div className="row">
							<div className="col s12 center-align">
								{!!users && <UserList users={users} />}
							</div>
						</div>
					</div>
				)}
			</Authorization>
		);
	}
}

const UserList = ({ users }) => (
	<>
		{Object.keys(users).map((key, index) => (
			<div key={index}>{users[key].username}</div>
		))}
	</>
);

ListUsers.propTypes = {
	auth: PropTypes.object.isRequired,
	error: PropTypes.object
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ setUsers }
)(ListUsers);
