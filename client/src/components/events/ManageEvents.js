import React from 'react';

import Menu from '../common/Menu';

const ManageEvents = () => <Menu headline={headline} items={items} />;

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
