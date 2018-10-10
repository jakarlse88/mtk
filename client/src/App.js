import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Component, Fragment } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/main.css';

import M from 'materialize-css';

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
import SignIn from './components/signin/SignIn';
import ManageArticles from './components/content/ManageArticles';
import ManageContent from './components/content/ManageContent';
import ManageEvents from './components/events/ManageEvents';
import ManageInformation from './components/content/ManageInformation';
import ManageUsers from './components/users/ManageUsers';
import Navbar from './components/layout/Navbar';
import NoMatch from './components/common/NoMatch';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUp from './components/users/SignUp';
import SignUpSuccess from './components/users/SignUpSuccess';
import SingleEvent from './components/events/SingleEvent';

import store from './store';

import { firebase } from './firebase';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authUser: null
		};
	}

	componentDidMount = () => {
		M.AutoInit();

		firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState({ authUser })
				: this.setState({ authUser: null });
		});
	};

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar authUser={this.state.authUser} />
						<main>
							<Switch>
								<Route exact path="/" component={Landing} />
								<ProtectedRoute
									exact
									path="/admin-event/:id"
									component={AdministrateEvent}
								/>
								<Route exact path="/articles" component={Articles} />
								<Route exact path="/articles/:id" component={Article} />
								<Route exact path="/contact" component={Contact} />
								<ProtectedRoute
									exact
									path="/create-article"
									component={CreateArticle}
								/>
								<ProtectedRoute
									exact
									path="/create-event"
									component={CreateEvent}
								/>
								<ProtectedRoute
									exact
									path="/create-event-success/:id"
									component={CreateEventSuccess}
								/>
								<ProtectedRoute
									exact
									path="/dashboard"
									component={Dashboard}
								/>
								<ProtectedRoute
									exact
									path="/edit-article/:id"
									component={EditArticle}
								/>
								<Route exact path="/list-events" component={ListEvents} />
								<Route exact path="/signin" component={SignIn} />
								<ProtectedRoute
									exact
									path="/edit-information/:type"
									component={EditInformation}
								/>
								<Route
									exact
									path="/information/:type"
									component={Information}
								/>
								<ProtectedRoute
									exact
									path="/manage-articles"
									component={ManageArticles}
								/>
								<ProtectedRoute
									exact
									path="/manage-content"
									component={ManageContent}
								/>
								<ProtectedRoute
									exact
									path="/manage-events"
									component={ManageEvents}
								/>
								<ProtectedRoute
									exact
									path="/manage-information"
									component={ManageInformation}
								/>
								<ProtectedRoute
									exact
									path="/manage-users"
									component={ManageUsers}
								/>
								<Route exact path="/sign-up" component={SignUp} />
								<Route
									exact
									path="/sign-up-success"
									component={SignUpSuccess}
								/>
								<Route
									exact
									path="/single-event/:id"
									component={SingleEvent}
								/>
								<Route component={NoMatch} />
							</Switch>
						</main>
						<Route path="/" component={Footer} />
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

export default App;
