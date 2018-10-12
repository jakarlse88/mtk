import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { setUsers } from '../../actions/authActions';

import withAuthorization from '../../HOC/withAuthorization';

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

	component;

	render() {
		const { users } = this.state;

		return (
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

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

const authCondition = authUser => !!authUser;

export default compose(
	withAuthorization(authCondition),
	connect(
		mapStateToProps,
		{ setUsers }
	)
)(ListUsers);
