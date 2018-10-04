import React from 'react';

import Menu from '../common/Menu';

const ManageArticles = () => <Menu headline={headline} items={items} />;

const headline = 'Administrér Nyhetsartikler';

const items = [
	{
		icon: 'plus',
		cardTitle: 'Opprett nyhetsartikkel',
		cardText: 'Opprett en ny, unik nyhetsartikkel.',
		permissions: 'Admin, moderator',
		linkTo: '/create-article'
	},
	{
		icon: 'list-alt',
		cardTitle: 'Se nyhetsartikler',
		cardText: 'Se alle nyhetsartikler i databasen.',
		permissions: 'Admin, moderator, public',
		linkTo: '/articles'
	}
];

export default ManageArticles;
