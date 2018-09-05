import PropTypes from 'prop-types';
import React from 'react';

import Moment from 'react-moment';

const Article = ({ author, content, date, headline }) => {
  return (
    <div className="container mt-4 mb-4">
      <h3>{headline}</h3>
      <p>
        <small className="text-muted">
          <Moment
            date={date}
            format="dddd DD/MM/YYYY, HH:MM"
          />{' '}
          by {author}
        </small>
      </p>
      <p>{content}</p>
    </div>
  );
};

Article.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  headline: PropTypes.string.isRequired
};

export default Article;
