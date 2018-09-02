import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Card from './Card';

export default class CardDeck extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-2 col-md">
          <div className="card-deck">
            {this.props.cards.map(card => (
              <Card
                imgSrc={card.imgSrc}
                imgAlt={card.imgAlt}
                cardTitle={card.cardTitle}
                cardText={card.cardText}
                readMoreHref={card.readMoreHref}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

CardDeck.defaultProps = {
  cards: [
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Lorem, ipsum dolor!',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Lorem, ipsum dolor!',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Lorem, ipsum dolor!',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Lorem, ipsum dolor!',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Lorem, ipsum dolor!',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    }
  ]
};

CardDeck.propTypes = {
  cards: PropTypes.array.isRequired
};
