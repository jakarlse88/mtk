import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardDeck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			types: [
				'ABOUT_CLUB',
				'TAEKWONDO',
				'HAPKIDO',
				'JUJUTSU',
				'MUAY_THAI',
				'SELF_DEFENSE',
				'SCHEDULE',
				'MEM_PRICING'
			]
		};
	}

	render() {
		return (
			<section className="row">
				{this.props.cards.map((card, index) => (
					<div key={index} className="col s12 m6 l4">
						<div className="card">
							<div className="card-image">
								<img src={card.imgSrc} alt={card.imgAlt} />
								<span className="card-title">{card.cardTitle}</span>
							</div>
							<div className="card-content">
								<p>{card.cardText}</p>
							</div>
							<div className="card-action grey lighten-4">
								<Link
									to={card.readMoreHref}
									className="blue-text waves-effect waves-light">
									Les mer {'   '}
									<i className="fas fa-caret-right" />
								</Link>
							</div>
						</div>
					</div>
				))}
			</section>
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
			readMoreHref: '/taekwondo'
		},
		{
			imgSrc: 'https://via.placeholder.com/350x185',
			imgAlt: 'card image header',
			cardTitle: 'Hapkido',
			cardText:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
			readMoreHref: '/hapkido'
		},
		{
			imgSrc: 'https://via.placeholder.com/350x185',
			imgAlt: 'card image header',
			cardTitle: 'Brasiliansk Jujutsu',
			cardText:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
			readMoreHref: '/jujutsu'
		},
		{
			imgSrc: 'https://via.placeholder.com/350x185',
			imgAlt: 'card image header',
			cardTitle: 'Muay Thai',
			cardText:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
			readMoreHref: '/thai'
		},
		{
			imgSrc: 'https://via.placeholder.com/350x185',
			imgAlt: 'card image header',
			cardTitle: 'Selvforsvar for kvinner',
			cardText:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos unde sunt reprehenderit iusto quis, quod laudantium quam nam sequi. Unde.',
			readMoreHref: '/self-defense'
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
