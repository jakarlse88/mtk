import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/main.css';

import M from 'materialize-css';

import AccountPage from './components/account_page';
import AdministrateEvent from './components/events/AdministrateEvent';
import Article from './components/articles/Article';
import Articles from './components/articles/Articles';
import Contact from './components/contact/Contact';
import CreateArticle from './components/articles/CreateArticle';
import CreateEvent from './components/events/CreateEvent';
import CreateEventSuccess from './components/events/CreateEventSuccess';
import Dashboard from './components/dashboard/Dashboard';
import EditArticle from './components/articles/EditArticle';
import EditInformation from './components/information/EditInformation';
import Footer from './components/layout/Footer';
import Information from './components/information/Information';
import Landing from './components/layout/Landing';
import ListEvents from './components/events/ListEvents';
import ListUsers from './components/users/ListUsers';
import ManageArticles from './components/content/ManageArticles';
import ManageContent from './components/content/ManageContent';
import ManageEvents from './components/events/ManageEvents';
import ManageInformation from './components/content/ManageInformation';
import ManageUsers from './components/users/ManageUsers';
import Navbar from './components/navbar';
import NoMatch from './components/common/NoMatch';
import PasswordForget from './components/password_forget';
import PasswordUpdate from './components/password_update';
import SignIn from './components/account_page/SignIn';
import SignUp from './components/account_page/SignUp';
import SignUpSuccess from './components/account_page/SignUpSuccess';
import SingleEvent from './components/events/SingleEvent';

import withAuthentication from './HOC/withAuthentication';

class App extends Component {
	componentDidMount = () => {
		M.AutoInit();
	};

	render() {
		return (
			<Router>
				<>
					<Navbar />
					<main>
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route
								exact
								path="/account"
								component={AccountPage}
							/>
							<Route
								exact
								path="/admin-event/:id"
								component={AdministrateEvent}
							/>
							<Route
								exact
								path="/articles"
								component={Articles}
							/>
							<Route
								exact
								path="/articles/:id"
								component={Article}
							/>
							<Route exact path="/contact" component={Contact} />
							<Route
								exact
								path="/create-article"
								component={CreateArticle}
							/>
							<Route
								exact
								path="/create-event"
								component={CreateEvent}
							/>
							<Route
								exact
								path="/create-event-success/:id"
								component={CreateEventSuccess}
							/>
							<Route
								exact
								path="/dashboard"
								component={Dashboard}
							/>
							<Route
								exact
								path="/edit-article/:id"
								component={EditArticle}
							/>
							<Route
								exact
								path="/list-events"
								component={ListEvents}
							/>
							<Route
								exact
								path="/list-users"
								component={ListUsers}
							/>

							<Route
								exact
								path="/edit-information/:type"
								component={EditInformation}
							/>
							<Route
								exact
								path="/information/:type"
								component={Information}
							/>
							<Route
								exact
								path="/manage-articles"
								component={ManageArticles}
							/>
							<Route
								exact
								path="/manage-content"
								component={ManageContent}
							/>
							<Route
								exact
								path="/manage-events"
								component={ManageEvents}
							/>
							<Route
								exact
								path="/manage-information"
								component={ManageInformation}
							/>
							<Route
								exact
								path="/manage-users"
								component={ManageUsers}
							/>
							<Route exact path="/signup" component={SignUp} />
							<Route
								exact
								path="/signup-success"
								component={SignUpSuccess}
							/>
							<Route
								exact
								path="/password-forget"
								component={PasswordForget}
							/>
							<Route
								exact
								path="/password-update"
								component={PasswordUpdate}
							/>
							<Route
								exact
								path="/single-event/:id"
								component={SingleEvent}
							/>
							<Route exact path="/signin" component={SignIn} />
							<Route component={NoMatch} />
						</Switch>
					</main>
					<Footer />
				</>
			</Router>
		);
	}
}

export default withAuthentication(App);
