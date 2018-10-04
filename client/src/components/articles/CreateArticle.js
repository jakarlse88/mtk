import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

import 'react-mde/lib/styles/css/react-mde-all.css';

class CreateArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mdeState: null
		};

		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true
		});
	}

	onValueChange = mdeState => {
		this.setState({ mdeState });
	};

	render() {
		return (
			<div className="container">
				<ReactMde
					editorState={this.state.mdeState}
					onChange={this.onValueChange}
					generateMarkdownPreview={markdown =>
						Promise.resolve(this.converter.makeHtml(markdown))
					}
				/>
			</div>
		);
	}
}

export default CreateArticle;
