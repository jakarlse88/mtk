import React from 'react';

import Authorization from '../common/Authorization';
import Menu from '../common/Menu';

const ManageUsers = () => (
	<Authorization authCondition={authUser => !!authUser}>
		{() => <Menu headline={headline} items={items} />}
	</Authorization>
);

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
