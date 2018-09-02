import PropTypes from 'prop-types';
import React from 'react';

const Card = ({
  imgSrc,
  imgAlt,
  cardTitle,
  cardText,
  readMoreHref
}) => {
  return (
    <div className="card">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">{cardText}</p>
        <a
          href={readMoreHref}
          className="btn btn-dark text-light">
          Les mer
        </a>
      </div>
    </div>
  );
};

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  readMoreHref: PropTypes.string.isRequired
};

export default Card;

// TODO: Good morning! Keep looking into nested
// grid layouts.
