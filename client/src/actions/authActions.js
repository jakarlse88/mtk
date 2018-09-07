import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

/*
 * Register user
 */
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/register-success'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/*
 * Login user
 */
export const loginUser = loginData => dispatch => {};

/*
 * TODO: Set logged-in user
 */

/*
 * TODO: Logout user
 */
