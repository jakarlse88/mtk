import PropTypes from 'prop-types';
import React from 'react';

import Moment from 'react-moment';

const GenericArticle = ({ author, content, date, headline }) => {
	return (
		<div className="container center-align">
			<h2>{headline}</h2>
			<p>
				<small className="grey-text">
					<Moment date={date} format="dddd DD/MM/YYYY, HH:MM" />, skrevet
					av {author}
				</small>
			</p>
			<p>{content}</p>
		</div>
	);
};

GenericArticle.propTypes = {
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired
};

export default GenericArticle;
