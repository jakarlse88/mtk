import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Contact from './components/contact/Contact';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import Information from './components/information/Information';
import Landing from './components/layout/Landing';
import Login from './components/login/Login';
import Navbar from './components/layout/Navbar';
import News from './components/news/News';
import ProtectedRoute from './components/common/ProtectedRoute';
import Register from './components/register/Register';
import RegisterSuccess from './components/register/RegisterSuccess';

import store from './store';

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
							path="/register"
							component={Register}
						/>
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
