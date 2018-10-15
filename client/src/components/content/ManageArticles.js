import React from 'react';

import Authorization from '../common/Authorization';
import Menu from '../common/Menu';

const ManageArticles = () => (
	<Authorization authCondition={authUser => !!authUser}>
		{() => <Menu headline={headline} items={items} />}
	</Authorization>
);

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
