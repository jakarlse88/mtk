import React from 'react';

import Menu from '../common/Menu';

const ManageArticles = () => <Menu headline={headline} items={items} />;

const headline = 'Manage Articles';

const items = [
	{
		icon: 'plus',
		cardTitle: 'Create Article',
		cardText: 'Create a new, unique article.',
		permissions: 'Admin, moderator',
		linkTo: '/create-article'
	},
	{
		icon: 'list-alt',
		cardTitle: 'View Articles',
		cardText: 'List all articles in database.',
		permissions: 'Admin, moderator, public',
		linkTo: '/articles'
	}
];

export default ManageArticles;
