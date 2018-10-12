import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
 * Import config
 */
import { config } from './config';

/*
 * Init
 */
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

/*
 * Init DB
 */
const db = firebase.database();

/*
 * Init auth
 */
const auth = firebase.auth();

export { auth, db };
