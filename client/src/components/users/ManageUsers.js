import React from 'react';

import Menu from '../common/Menu';
/*
 * TODO: view all users
 */

const ManageUsers = () => <Menu headline={headline} items={items} />;

const headline = 'Administrér Brukere';

const items = [
	{
		icon: 'plus',
		cardTitle: 'Opprett Bruker',
		cardText: 'Registrér en ny, unik bruker.',
		permissions: 'Admin',
		linkTo: '/register-user'
	}
];

export default ManageUsers;
