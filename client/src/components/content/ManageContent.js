import React from 'react';

import Menu from '../common/Menu';

const ManageContent = () => <Menu headline={headline} items={items} />;

const headline = 'Manage Content';

const items = [
	{
		icon: 'newspaper',
		cardTitle: 'Articles',
		cardText: 'Write a new article, or manage already existing articles',
		permissions: 'Admin',
		linkTo: '/manage-articles'
	},
	{
		icon: 'info-circle',
		cardTitle: 'Information',
		cardText: '"About" pages, schedule, etc.',
		permissions: 'Admin, instructor, public',
		linkTo: '/manage-information'
	}
];

export default ManageContent;
