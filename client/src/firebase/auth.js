import { auth } from './firebase';

/*
 * Sign up
 */
export const doCreateUserWithEmailAndPassword = (email, password) =>
	auth.createUserWithEmailAndPassword(email, password);

/*
 * Sign in
 */
export const doSignInWithEmailAndPassword = (email, password) =>
	auth.signInWithEmailAndPassword(email, password);

/*
 * Sign out
 */
export const doSignOut = () => auth.signOut();

/*
 * Password reset
 */
export const doResetPassword = email => auth.sendPasswordResetEmail(email);

/*
 * Password change
 */
export const doUpdatePassword = password =>
	auth.currentUser.updatePassword(password);
