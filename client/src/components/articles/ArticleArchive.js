import React from 'react';

export default () => {
	const listItems = ['', '', '', '', '', '', '', ''];

	return (
		<div>
			<hr />
			<h4 className="text-center text-lg-left">Archives</h4>
			<ul className="list-unstyled text-center text-lg-left">
				{listItems.map((item, index) => (
					<li className="text-secondary" key={index}>
						Month year
					</li>
				))}
			</ul>
		</div>
	);
};
