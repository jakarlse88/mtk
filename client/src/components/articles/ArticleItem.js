import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Moment from 'react-moment';

const ArticleItem = ({ author, category, date, headline, id, text }) => {
	return (
		<Fragment>
			<div className="section">
				<h3>{headline}</h3>
				<p>
					<small className="text-muted">
						<Moment date={date} format="dddd DD/MM/YYYY, HH:MM" /> by{' '}
						{author}
					</small>
				</p>
				<p>{text}</p>
				<Link to={`/articles/${id}`}>Les mer...</Link>
				<p className="mt-2">
					<small className="text-muted">Category: {category}</small>
				</p>
			</div>
			<div className="divider" />
		</Fragment>
	);
};

ArticleItem.defaultProps = {
	author: 'Testy McTestface',
	category: 'Test',
	date: Date.now(),
	headline: 'Lorem ipsum dolor sit, amet consectetur',
	text:
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam doloribus rerum architecto consectetur nemo dolorem mollitia corporis eligendi pariatur deleniti!'
};

ArticleItem.propTypes = {
	author: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default ArticleItem;
