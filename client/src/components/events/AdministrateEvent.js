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
					<div className="col s12 center-align">
						<h2>{event.name}</h2>
						{event.owner && (
							<p className="center-align">Opprettet av: {event.owner}</p>
						)}
						<hr />
					</div>

					<div className="col s12 l4">
						<h4>Detaljer</h4>
						<p>
							<strong>Fra:</strong> <br />
							<Moment date={event.from} format="dddd DD/MM/YYYY" />
						</p>
						<p>
							<strong>Til:</strong> <br />
							<Moment date={event.to} format="dddd DD/MM/YYYY" />{' '}
						</p>
						<p>
							<strong>Beskrivelse:</strong>
							<br />
							{event.description}
						</p>
					</div>

					<div className="col s12 l8">
						<h4>Timeplan</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
							deleniti accusamus corrupti ab cum facere blanditiis.
							Laudantium temporibus, illo modi natus delectus aspernatur
							repellat unde. Ullam odit assumenda maxime consequatur quos
							ipsam eum! Veniam id obcaecati blanditiis, ullam dolorem
							inventore minima iusto corporis nesciunt. Corporis ex
							architecto natus sit laborum temporibus voluptatibus! Quod,
							voluptate? Obcaecati saepe, fugiat accusantium animi deserunt
							veniam veritatis. Dolor voluptatibus harum illum consectetur
							repellendus fuga, veniam nobis consequatur ex dolores rerum
							minus omnis dolore, exercitationem repudiandae tempora
							impedit aut reiciendis numquam distinctio illo inventore et.
							Nulla ab quam reprehenderit labore vel blanditiis eligendi a
							reiciendis ipsum.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

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
