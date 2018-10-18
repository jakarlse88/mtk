import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Authorization from '../common/Authorization';

import { getAllUsers } from '../../actions/usersActions';

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
		this.props.getAllUsers();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.users) {
			this.setState({
				users: nextProps.users.all
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
			<div key={index}>
				{users[key].name}{' '}
				<em className="grey-text">{users[key].role}</em>
			</div>
		))}
	</>
);

ListUsers.propTypes = {
	error: PropTypes.object,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	users: state.users
});

export default connect(
	mapStateToProps,
	{ getAllUsers }
)(ListUsers);
