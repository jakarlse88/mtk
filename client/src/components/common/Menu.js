import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import classnames from 'classnames';

const Menu = ({ headline, items }) => {
	return (
		<div className="container">
			<h2 className="center-align">{headline}</h2>
			<div className="row">
				<div className="row">
					<div className="col s12">
						<div className="divider" />
					</div>
				</div>
				<div className="row">
					<div className="col" />
				</div>
				<div className="row">
					<div className="col" />
				</div>
				{items.map((item, index) => (
					<div
						className={classnames('col s12 center-align mb-2', {
							m6: items.length === 2,
							m4: items.length > 2
						})}
						key={index}>
						<i className={`fas fa-${item.icon} fa-3x`} />
						<Link to={item.linkTo} className="center-align">
							<h5>{item.cardTitle}</h5>
						</Link>
						<p>{item.cardText}</p>
						<small className="grey-text">{item.permissions}</small>
					</div>
				))}
				<div className="row">
					<div className="col" />
				</div>
				<div className="row">
					<div className="col" />
				</div>
				<div className="row">
					<div className="col" />
				</div>
				<div className="col s12 center-align">
					<Link to="/dashboard">
						<button className="btn grey">
							<i className="fas fa-arrow-left left" />
							Tilbake
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

Menu.propTypes = {
	headline: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
};

export default Menu;
