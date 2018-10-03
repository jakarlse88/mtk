import React from 'react';

import Menu from '../common/Menu';

const ManageEvents = () => <Menu headline={headline} items={items} />;

const headline = 'Manage Events';

const items = [
	{
		icon: 'plus-circle',
		cardTitle: 'Create event',
		cardText: 'Create a new, unique event.',
		permissions: 'Admin',
		linkTo: '/create-event'
	},
	{
		icon: 'list-alt',
		cardTitle: 'View events',
		cardText: 'List all events in database.',
		permissions: 'Admin, instructor, public',
		linkTo: '/list-events'
	}
];

export default ManageEvents;
