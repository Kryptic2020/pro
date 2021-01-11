import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fetchUser } from './surveys';
//import { AUTH_FAIL } from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	};
};


export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authFail = (data) => {
	//console.log(data);
	return {
		type: actionTypes.AUTH_FAIL,
		msnErr: data,
	};
};

export const auth = (fullName, phone, email, password, isSignup, history) =>
	dispatch => {
		const authData = {
			googleId: null,
			fullName: fullName,
			email: email,
			photo: null,
			phone: phone,
			provider: 'App',
			password: password,
			isSignup: isSignup
		};
		let url = '/api/register';
		if (!isSignup) {
			url = '/api/login';
		};

		axios.post(url, authData)
			.then(res => {
				dispatch(fetchUser());
				if (isSignup && res.data === 'registered') {
					history.push('/verifyEmail');
				} else { dispatch(authFail(res.data)); }
				if (!isSignup && res.data === '') {
					history.push('/');
				};

			})
			.catch(err => {
				if (err.response) {
					console.log(err.response, 'neg res');

				} else if (err.request) {
					console.log(err.request, 'neg req');
				} else {
					dispatch(authFail(err));
					console.log('neither req or res error');
				}
			});
		//console.log(res.data);
	};

export const users = (users) => {
	return {
		type: actionTypes.USERS,
		users: users,
	};
};  

export const fetchAllUsers = () => dispatch => {
	axios.get('/api/contacts')
		.then(res => {dispatch(users(res.data)); })
		.catch(err => { console.log(err); });
  
};



