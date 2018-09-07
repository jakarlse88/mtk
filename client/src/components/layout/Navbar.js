import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false
		};
	}

	componentDidMount = () => {
		if (this.props.auth.isAuthenticated) {
			this.setState({
				isAuthenticated: this.props.auth.isAuthenticated
			});
		} else {
			this.setState({
				isAuthenticated: false
			});
		}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth.isAuthenticated) {
			this.setState({
				isAuthenticated: nextProps.auth.isAuthenticated
			});
		}
	};

	render() {
		const visitorLinks = (
			<Link to="/login" className="nav-item nav-link">
				<span className="badge">
					<i className="fas fa-user fa-md" />
				</span>
				Login
			</Link>
		);

		const adminLinks = (
			<Link to="/dashboard" className="nav-item nav-link">
				<span className="badge">
					<i className="fas fa-user fa-md" />
				</span>
				Dashboard
			</Link>
		);

		const { isAuthenticated } = this.state;

		return (
			<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand text-light" to="/">
					<span className="badge">
						<i className="fas fa-yin-yang fa-lg mr-2" />
					</span>
					Moss Taekwondo Klubb
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarAltMarkup"
					aria-expanded="false"
					aria-label="toggle navigation">
					<span className="navbar-toggler-icon navbar-inverse" />
				</button>
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link to="/news" className=" nav-item nav-link">
							Nyheter
						</Link>
						<div className="nav-item dropdown">
							<a
								href="#!"
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Informasjon
							</a>
							<div
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink">
								<Link
									to="/about-club"
									className="dropdown-item">
									Om klubben
								</Link>
								<Link
									to="/taekwondo"
									className="dropdown-item">
									Taekwondo
								</Link>
								<Link
									to="/hapkido"
									className="dropdown-item">
									Hapkido
								</Link>
								<Link
									to="/jujutsu"
									className="dropdown-item">
									Brasiliansk Jujutsu
								</Link>
								<Link to="/thai" className="dropdown-item">
									Muay Thai
								</Link>
								<Link
									to="/self-defense"
									className="dropdown-item">
									Selvforsvar for kvinner
								</Link>
								<Link
									to="/schedule"
									className="dropdown-item">
									Treningstider
								</Link>
								<Link
									to="/pricing"
									className="dropdown-item">
									Medlemskap og priser
								</Link>
							</div>
						</div>
						<Link to="/contact" className=" nav-item nav-link">
							Kontakt oss
						</Link>
						{!isAuthenticated && visitorLinks}
						{isAuthenticated && adminLinks}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
