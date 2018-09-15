import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Card = ({
	imgSrc,
	imgAlt,
	cardTitle,
	cardLead,
	cardText,
	darkStyle,
	readMoreHref
}) => {
	return (
		<div
			className={classnames('card w-100', {
				'bg-dark text-light border-dark': darkStyle
			})}>
			{imgSrc ? (
				<img src={imgSrc} alt={imgAlt} className="card-img-top" />
			) : null}
			<div className="card-body">
				<h5 className="card-title">{cardTitle}</h5>
				{cardLead ? <p className="lead">{cardLead}</p> : null}
				<p className="card-text">{cardText}</p>
				{readMoreHref ? (
					<Link to={readMoreHref} className="btn btn-dark text-light">
						Les mer
					</Link>
				) : null}
			</div>
		</div>
	);
};

Card.defaultProps = {
	darkStyle: false
};

Card.propTypes = {
	cardLead: PropTypes.string,
	cardText: PropTypes.string.isRequired,
	cardTitle: PropTypes.string.isRequired,
	darkStyle: PropTypes.bool.isRequired,
	imgAlt: PropTypes.string,
	imgSrc: PropTypes.string,
	readMoreHref: PropTypes.string
};

export default Card;
