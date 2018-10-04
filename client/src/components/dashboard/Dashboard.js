import { Link } from 'react-router-dom';
import React from 'react';

const Dashboard = () => (
	<div className="container">
		<div className="row">
			<h2 className="center-align">Kontrollpanel</h2>
		</div>
		<div className="row">
			{items.map((item, index) => (
				<div className="col s12 m6 l4 center-align" key={index}>
					<i className={`fas fa-${item.icon} fa-3x`} />
					<Link to={item.linkTo} className="text-center">
						<h5>{item.cardTitle}</h5>
					</Link>
					<p className="grey-text">{item.cardText}</p>
					<small className="grey-text">{item.permissions}</small>
				</div>
			))}
		</div>
	</div>
);

const items = [
	{
		icon: 'tasks',
		cardTitle: 'Arrangementer',
		cardText: 'Seminarer, graderinger, konkurranser, samlinger, etc.',
		permissions: 'Admin, moderator, assistent',
		linkTo: '/manage-events'
	},
	{
		icon: 'align-justify',
		cardTitle: 'Innhold',
		cardText: 'Nyheter og informasjonssider',
		permissions: 'Admin, moderator, assistent',
		linkTo: '/manage-content'
	},
	{
		icon: 'users',
		cardTitle: 'Brukere',
		cardText: 'Opprett ny bruker, administrér eksisterende brukere',
		permissions: 'Admin',
		linkTo: '/manage-users'
	}
];

export default Dashboard;
