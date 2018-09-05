import PropTypes from 'prop-types';
import React from 'react';

import Moment from 'react-moment';

const NewsItem = ({
  author,
  category,
  date,
  headline,
  text
}) => {
  return (
    <div>
      <h3>{headline}</h3>
      <p>
        <small>
          <Moment
            date={date}
            format="dddd DD/MM/YYYY, HH:MM"
          />{' '}
          by {author}
        </small>
      </p>
      <p>{text}</p>
      <p>
        <small>Category: {category}</small>
      </p>
    </div>
  );
};

NewsItem.defaultProps = {
  author: 'Testy McTestface',
  category: 'Test',
  date: Date.now(),
  headline: 'Lorem ipsum dolor sit, amet consectetur',
  text:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam doloribus rerum architecto consectetur nemo dolorem mollitia corporis eligendi pariatur deleniti!'
};

NewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default NewsItem;
