import React, { Component } from 'react';

import GenericArticle from '../common/GenericArticle';

export default class AboutThai extends Component {
	render() {
		return (
			<GenericArticle
				author={testProps.author}
				content={testProps.content}
				date={testProps.date}
				headline={testProps.headline}
			/>
		);
	}
}

const testProps = {
	author: 'Testy McTestface',
	content:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut beatae qui laboriosam mollitia voluptatum. Totam nobis minima quaerat autem recusandae, sapiente labore alias minus molestias magni soluta aspernatur consequatur et. Quibusdam dolores est corrupti, in rerum suscipit quos cupiditate magni omnis natus vel veniam culpa earum fugit aperiam numquam, voluptates quaerat nulla, voluptatem totam! Soluta amet voluptatibus, neque, sapiente nemo obcaecati voluptatum, optio odit consectetur alias ipsam odio! Saepe quasi blanditiis a ex quidem quia non accusantium quaerat eos voluptate ducimus quibusdam fugiat, fugit dolore nemo vel, quis adipisci debitis quod recusandae alias? Voluptatibus alias quidem ad iusto. Mollitia perferendis nemo ratione saepe animi perspiciatis architecto laudantium obcaecati et quo qui vero tempore amet sunt placeat, minima iste voluptatum, quisquam cum, odio natus! Atque quisquam ad ratione! Architecto doloribus, distinctio praesentium dolorum quae voluptates earum ut quo ratione iure et adipisci quos laboriosam dolorem ipsam quis, illum nostrum quasi? Beatae id dolorum provident temporibus quas ex cum. Temporibus minima dolores labore culpa, ipsa sequi. Earum necessitatibus itaque cumque autem? Assumenda ipsa nesciunt numquam! Officia ipsam eum ipsum aspernatur, pariatur quas impedit a. Dicta sapiente esse odit! Explicabo amet, magni magnam labore quas quam deleniti, perspiciatis ad, beatae laboriosam temporibus iste!',
	date: Date.now(),
	headline: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
};
