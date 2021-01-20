import * as actionTypes from './actionTypes';
import axios from 'axios';
import { FETCH_USER } from './actionTypes';

//import { AUTH_FAIL } from './actionTypes';

export const setPersonalInfo = (
	fullName,
	phone,
	history
) => async (dispatch) => {
	const data = { fullName, phone };
	console.log('data', data);
	await axios
		.post('/api/personal-info', data)
		.then((res) => {
			console.log('res', res.data);
			if (res.data) {
				history.push('/');
			}
		})
		.catch((res) => {});
};

export const auth = (
	email,
	password,
	fullName,
	phone,
	isSignup,
	history
) => async (dispatch) => {
	const authData = {
		googleId: null,
		fullName,
		email: email,
		//photo: null,
		phone,
		provider: 'App',
		password,
		isSignup,
	};

	let url = '/api/register';
	if (!isSignup) {
		url = '/api/login';
	}

	await axios
		.post(url, authData)
		.then((res) => {
			console.log(res.data);
			dispatch(fetchUser());
			if (isSignup && res.data === 'registered') {
				history.push('/verifyEmail');
			} else {
				dispatch(authFail(res.data));
			}
			if (!isSignup && res.data === 'logged') {
				history.push('/');
			}
		})
		.catch((err) => {
			if (err.response) {
				console.log(err.response, 'neg res');
			} else if (err.request) {
				console.log(err.request, 'neg req');
			} else {
				dispatch(authFail(err));
				console.log('neither req or res error zic');
			}
		});
};

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
	if (res.data) {
		dispatch(authCheck());
	}
};

export const authCheck = () => {
	return {
		type: actionTypes.AUTH_CHECK,
	};
};

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

/*
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};*/

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

export const users = (users) => {
	return {
		type: actionTypes.USERS,
		users: users,
	};
};

export const fetchAllUsers = () => (dispatch) => {
	axios
		.get('/api/contacts')
		.then((res) => {
			dispatch(users(res.data));
		})
		.catch((err) => {
			console.log(err);
		});
};
