import { Link } from 'react-router-dom';
import React from 'react';

export default () => (
	<ul id="info-menu-dropdown" className="dropdown-content">
		<li>
			<Link
				to="/information/about_club"
				className="grey-text waves-effect waves-blue text-darken-2">
				Om klubben
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/taekwondo">
				Taekwondo
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/hapkido">
				Hapkido
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/jujutsu">
				Brasiliansk Jujutsu
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/muay_thai">
				Muay Thai
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/self_defense">
				Selvforsvar for kvinner
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/schedule">
				Treningstider
			</Link>
		</li>
		<li>
			<Link
				className="grey-text waves-effect waves-blue text-darken-2"
				to="/information/mem_pricing">
				Medlemskap & priser
			</Link>
		</li>
	</ul>
);
