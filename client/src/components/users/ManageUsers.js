import React from 'react';

import Menu from '../common/Menu';
/*
 * TODO: view all users
 */

const ManageUsers = () => <Menu headline={headline} items={items} />;

const headline = 'Administrér Brukere';

const items = [
	{
		icon: 'search',
		cardTitle: 'Se brukere',
		cardText: 'Liste over alle brukere.',
		permissions: 'Admin',
		linkTo: '/list-users'
	}
];

export default ManageUsers;
