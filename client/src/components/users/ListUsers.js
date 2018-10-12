import React, { Component } from 'react';

import { db } from '../../firebase';

import withAuthorization from '../../HOC/withAuthorization';

class ListUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null
		};
	}

	componentDidMount = () => {
		db.onceGetUsers().then(snapshot =>
			this.setState({ users: snapshot.val() })
		);
	};

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

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(ListUsers);
