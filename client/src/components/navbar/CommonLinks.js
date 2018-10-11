import { Link } from 'react-router-dom';
import React from 'react';

import AuthLinks from './AuthLinks';
import VisitorLinks from './VisitorLinks';

export default authUser => (
	<>
		<a href="#!" className="sidenav-trigger" data-target="mobile-menu">
			<i className="fas fa-bars fa-2x grey-text text-darken-2" />
		</a>
		<ul id="nav-mobile" className="right hide-on-med-and-down">
			<li>
				<Link
					to="/articles"
					className="grey-text text-darken-2 waves-effect waves-blue">
					Nyheter
				</Link>
			</li>
			<li>
				<Link
					to="/list-events"
					className="waves-effect waves-blue grey-text text-darken-2">
					Arrangementer
				</Link>
			</li>
			<li>
				<Link
					to="/contact"
					className="waves-effect waves-blue grey-text text-darken-2">
					Kontakt oss
				</Link>
			</li>
			<li>
				<a
					href="#!"
					className="dropdown-trigger grey-text text-darken-2"
					data-target="info-menu-dropdown">
					Informasjon
					<i className="right fas fa-caret-down fa-1x" />
				</a>
			</li>
			{!authUser && <VisitorLinks />}
			{authUser && <AuthLinks />}
		</ul>
	</>
);
