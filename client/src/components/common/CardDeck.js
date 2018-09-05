import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Card from './Card';

export default class CardDeck extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        {this.props.cards.map((card, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-lg-4 mb-4">
            <Card
              imgSrc={card.imgSrc}
              imgAlt={card.imgAlt}
              cardTitle={card.cardTitle}
              cardText={card.cardText}
              readMoreHref={card.readMoreHref}
            />
          </div>
        ))}
      </div>
    );
  }
}

CardDeck.defaultProps = {
  cards: [
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Taekwondo',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Hapkido',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Brasiliansk Jujutsu',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Muay Thai',
      cardText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
      readMoreHref: '#!'
    },
    {
      imgSrc: 'https://via.placeholder.com/350x185',
      imgAlt: 'card image header',
      cardTitle: 'Selvforsvar for kvinner',
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
