import React from 'react';

import Authorization from '../common/Authorization';
import Menu from '../common/Menu';

const ManageEvents = () => (
	<Authorization authCondition={authUser => !!authUser}>
		{() => <Menu headline={headline} items={items} />}
	</Authorization>
);

const headline = 'Administrér Arrangementer';

const items = [
	{
		icon: 'plus-circle',
		cardTitle: 'Opprett arrangement',
		cardText: 'Opprett et nytt, unikt arrangement',
		permissions: 'Admin, moderator',
		linkTo: '/create-event'
	},
	{
		icon: 'list-alt',
		cardTitle: 'Se arrangementer',
		cardText: 'Se alle arrangementer i databasen.',
		permissions: 'Admin, instructor, moderator, public',
		linkTo: '/list-events'
	}
];

export default ManageEvents;
