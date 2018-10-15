import React from 'react';

import Authorization from '../common/Authorization';
import Menu from '../common/Menu';

const ManageInformation = () => (
	<Authorization authCondition={authUser => !!authUser}>
		{() => <Menu headline={headline} items={items} />}
	</Authorization>
);

const headline = 'Manage Information';

const items = [];

export default ManageInformation;
