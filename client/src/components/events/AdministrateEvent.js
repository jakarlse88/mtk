import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getEvent } from '../../actions/eventActions';

class AdministrateEvent extends Component {
	componentDidMount = () => {
		this.props.getEvent(this.props.match.params.id);
	};

	render() {
		const { event } = this.props.events;

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 m-auto">
						<h2 className="text-center mt-4">{event.name}</h2>
						<p className="text-muted text-center">
							<small>
								<Moment
									date={event.from}
									format="dddd DD/MM/YYYY"
								/>{' '}
								-{' '}
								<Moment
									date={event.to}
									format="dddd DD/MM/YYYY"
								/>
							</small>
						</p>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

/*
 * TODO: participants
 * TODO: schedule?
 */

AdministrateEvent.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	events: PropTypes.object.isRequired,
	getEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	events: state.events
});

export default connect(
	mapStateToProps,
	{ getEvent }
)(AdministrateEvent);
