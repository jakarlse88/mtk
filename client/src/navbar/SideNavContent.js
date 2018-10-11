import { Link } from 'react-router-dom';
import React from 'react';

const dropdownLinks = [
	{
		link: '/information/about-club',
		text: 'Om klubben'
	},
	{
		link: '/information/taekwondo',
		text: 'Taekwondo'
	},
	{
		link: '/information/hapkido',
		text: 'Hapkido'
	},
	{
		link: '/information/jujutsu',
		text: 'Jujutsu'
	},
	{
		link: '/information/muay_thai',
		text: 'Muay Thai'
	},
	{
		link: '/information/self_defense',
		text: 'Selvforsvar for kvinner'
	},
	{
		link: '/information/schedule',
		text: 'Treningstider'
	},
	{
		link: '/information/mem_pricing',
		text: 'Medlemskap & priser'
	}
];

export default (authUser, onSidenavLinkClick, onSidenavLogoutClick) => (
	<ul className="sidenav collapsible" id="mobile-menu">
		<li>
			<Link
				to="/articles"
				className="waves-effect waves-blue collapsible-header"
				onClick={onSidenavLinkClick}>
				Nyheter
				<i className="left fas fa-newspaper fa-1x" />
			</Link>
		</li>
		<li>
			<Link
				to="/list-events"
				className="waves-effect waves-blue collapsible-header"
				onClick={onSidenavLinkClick}>
				Arrangementer
				<i className="left fas fa-calendar fa-1x" />
			</Link>
		</li>
		<li>
			<Link
				className="waves-effect waves-blue collapsible-header"
				to="/contact"
				onClick={onSidenavLinkClick}>
				Kontakt oss
				<i className="left fas fa-envelope fa-1x" />
			</Link>
		</li>
		<li>
			<a href="#!" className="waves-effect waves-blue collapsible-header">
				Informasjon
				<i className="left fas fa-info-circle fa-1x" />
			</a>
			<div className="collapsible-body">
				<ul>
					{dropdownLinks.map((item, index) => (
						<li className="waves-effect waves-blue" key={index}>
							<Link to={item.link} onClick={onSidenavLinkClick}>
								{item.text}
								<i className="left fas fa-caret-right fa-1x" />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</li>
		{!authUser && (
			<li>
				<Link
					className="collapsible-header waves-effect waves-blue "
					to="/signin"
					onClick={onSidenavLinkClick}>
					<i className="left fas fa-user fa-sm" />
					Innlogging
				</Link>
			</li>
		)}
		{authUser && (
			<>
				<li>
					<Link
						className="collapsible-header waves-effect waves-blue "
						to="/dashboard"
						onClick={onSidenavLinkClick}>
						<i className="left fas fa-tachometer-alt fa-1x" />
						Kontrollpanel
					</Link>
				</li>
				<li>
					<Link
						to="/account"
						className="collapsible-header waves-effect waves-blue"
						onClick={onSidenavLogoutClick}>
						<i className="left fas fa-user fa-1x" />
						Brukerkonto
					</Link>
				</li>
			</>
		)}
	</ul>
);
