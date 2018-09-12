import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import React, { Component, Fragment } from 'react';

import './App.css';

import AboutClub from './components/information/AboutClub';
import AboutHapkido from './components/information/AboutHapkido';
import AboutJujutsu from './components/information/AboutJujutsu';
import AboutPricing from './components/information/AboutPricing';
import AboutSchedule from './components/information/AboutSchedule';
import AboutSelfDefense from './components/information/AboutSelfDefense';
import AboutTaekwondo from './components/information/AboutTaekwondo';
import AboutThai from './components/information/AboutThai';
import AdministrateEvent from './components/events/AdministrateEvent';
import CreateEvent from './components/events/CreateEvent';
import CreateEventSuccess from './components/events/CreateEventSuccess';
import Contact from './components/contact/Contact';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import Information from './components/information/Information';
import Landing from './components/layout/Landing';
import ListEvents from './components/events/ListEvents';
import Login from './components/login/Login';
import ManageContent from './components/content/ManageContent';
import ManageEvents from './components/events/ManageEvents';
import ManageUsers from './components/users/ManageUsers';
import Navbar from './components/layout/Navbar';
import News from './components/news/News';
import ProtectedRoute from './components/common/ProtectedRoute';
import Register from './components/register/Register';
import RegisterSuccess from './components/register/RegisterSuccess';
import SingleEvent from './components/events/SingleEvent';

import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import setAuthToken from './utils/setAuthToken';

// Check for token
if (localStorage.jwtToken) {
	// Set Authorization header to auth token
	setAuthToken(localStorage.jwtToken);

	// Decode token, get user info
	const decoded = jwt_decode(localStorage.jwtToken);

	// Set user, isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());

		// Redirect to front page
		window.location.href = '/';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Route path="/" component={Navbar} />
						<Route exact path="/" component={Landing} />
						<Route
							exact
							path="/about-club"
							component={AboutClub}
						/>
						<Route exact path="/contact" component={Contact} />
						<Switch>
							<ProtectedRoute
								exact
								path="/dashboard"
								component={Dashboard}
							/>
						</Switch>
						<Switch>
							<ProtectedRoute
								exact
								path="/manage-events"
								component={ManageEvents}
							/>
						</Switch>
						<Switch>
							<ProtectedRoute
								exact
								path="/create-event"
								component={CreateEvent}
							/>
						</Switch>
						<Switch>
							<ProtectedRoute
								exact
								path="/create-event-success/:id"
								component={CreateEventSuccess}
							/>
						</Switch>
						<Route
							exact
							path="/list-events"
							component={ListEvents}
						/>
						<Route
							exact
							path="/single-event/:id"
							component={SingleEvent}
						/>
						<Switch>
							<ProtectedRoute
								exact
								path="/admin-event/:id"
								component={AdministrateEvent}
							/>
						</Switch>
						<Switch>
							<ProtectedRoute
								exact
								path="/manage-content"
								component={ManageContent}
							/>
						</Switch>
						<Route
							exact
							path="/hapkido"
							component={AboutHapkido}
						/>
						<Route
							exact
							path="/information"
							component={Information}
						/>
						<Route
							exact
							path="/jujutsu"
							component={AboutJujutsu}
						/>
						<Route exact path="/login" component={Login} />
						<Route exact path="/news" component={News} />
						<Route
							exact
							path="/pricing"
							component={AboutPricing}
						/>
						<Route
							exact
							path="/register-user"
							component={Register}
						/>
						<Switch>
							<ProtectedRoute
								exact
								path="/manage-users"
								component={ManageUsers}
							/>
						</Switch>
						<Route
							exact
							path="/register-success"
							component={RegisterSuccess}
						/>
						<Route
							exact
							path="/schedule"
							component={AboutSchedule}
						/>
						<Route
							exact
							path="/self-defense"
							component={AboutSelfDefense}
						/>
						<Route
							exact
							path="/taekwondo"
							component={AboutTaekwondo}
						/>
						<Route exact path="/thai" component={AboutThai} />
						<Route path="/" component={Footer} />
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

export default App;
