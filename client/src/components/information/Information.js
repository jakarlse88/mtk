import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getInfoArticle } from '../../actions/contentActions';

import GenericArticle from '../common/GenericArticle';

class Information extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: null,
			errors: null,
			auth: null
		};
	}

	componentDidMount = () => {
		this.props.getInfoArticle(this.props.match.params.type.toUpperCase());
	};

	componentWillReceiveProps = nextProps => {
		if (
			nextProps.match.params.type.toUpperCase() !==
			this.props.match.params.type.toUpperCase()
		) {
			this.props.getInfoArticle(nextProps.match.params.type.toUpperCase());
			this.forceUpdate();
		}

		if (nextProps.content) {
			this.setState({
				content: nextProps.content
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}

		if (nextProps.auth) {
			this.setState({
				auth: nextProps.auth
			});
		}
	};

	render() {
		const { auth, content, errors } = this.state;

		return (
			<div className="container">
				{content && content.articleLoading && !errors.infoArticle ? (
					<div className="row">
						<div className="col s12">
							<p className="center-align">
								<i className="fa fa-spinner fa-spin fa-3x" />
							</p>
						</div>
					</div>
				) : content && content.infoArticle && !errors.infoArticle ? (
					<div className="row">
						<div className="col s12">
							<GenericArticle
								author={content.infoArticle.author.name}
								content={content.infoArticle.content}
								date={content.infoArticle.date}
								headline={content.infoArticle.title}
							/>
						</div>
					</div>
				) : errors && errors.infoArticle ? (
					<div className="row">
						<div className="col s12 center-align">
							<h4 className="red-text">Error</h4>
						</div>
						<div className="col s12 center-align">
							<p>{errors.infoArticle}</p>
						</div>
					</div>
				) : (
					<div className="row">
						<div className="col s12">
							<p>Noe rart har skjedd.</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

Information.propTypes = {
	auth: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getInfoArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	content: state.content,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getInfoArticle }
)(Information);
