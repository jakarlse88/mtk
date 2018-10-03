import React from 'react';

import Menu from '../common/Menu';
/*
 * TODO: view all users
 */

const ManageUsers = () => <Menu headline={headline} items={items} />;

const headline = 'Manage Users';

const items = [
	{
		icon: 'plus',
		cardTitle: 'Register User',
		cardText: 'Create a new, unique user.',
		permissions: 'Admin',
		linkTo: '/register-user'
	}
];

export default ManageUsers;
