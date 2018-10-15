import React from 'react';

import Authorization from '../common/Authorization';
import Menu from '../common/Menu';

const ManageContent = () => (
	<Authorization authCondition={authUser => !!authUser}>
		{() => <Menu headline={headline} items={items} />}
	</Authorization>
);

const headline = 'Administrér Innhold';

const items = [
	{
		icon: 'newspaper',
		cardTitle: 'Nyhetsartikler',
		cardText:
			'Opprett en ny artikkel, eller redigér en allerede eksisterende artikkel',
		permissions: 'Admin, moderator',
		linkTo: '/manage-articles'
	},
	{
		icon: 'info-circle',
		cardTitle: 'Informasjonsartikler',
		cardText: '"Om"-sider, timeplan, etc.',
		permissions: 'Admin, instructor',
		linkTo: '/manage-information'
	}
];

export default ManageContent;
