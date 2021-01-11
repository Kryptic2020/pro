import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility2';

const initialState = {
	email: null,
	fullName:null,
	givenName: null,
	familyName: null,
	photo: null,
	phone: null,
	password: null,
	cpassword: null,
	provider: null,
	loading: false,
	error: null,
	expirationTime: null,
	_id: null,
	credits: null,
	googleId: null,
	authenticated: false,
	msnErr: null,
	authRedirectPath: null,
	users: [],
	isAdmin: false,
	theme: '',
	daysCalendarView:'',
};


const fetchUser = (state, action) => {
	//console.log(action.payload);
	return updateObject(state, {
		email: action.payload.email,
		credits: action.payload.credits,
		_id: action.payload._id,
		fullName: action.payload.fullName,
		provider: action.payload.provider,
		familyName: action.payload.familyName,
		photo: action.payload.photo,
		isAdmin: action.payload.isAdmin,
		emailVerified: action.payload.emailVerified,
		theme: action.payload.theme,
		daysCalendarView:action.payload.daysCalendarView
	});
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		loading: false
	});
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {
		authRedirectPath: action.path
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		msnErr: action.msnErr,
		loading: false
	});
};

const authCheck = (state, action) => {
	return updateObject(state, {
		authenticated: true
	});
};

const users = (state, action) => {
	return updateObject(state, {
		users: action.users
	});
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.FETCH_USER: return fetchUser(state, action);
	case actionTypes.AUTH_CHECK: return authCheck(state, action);
	case actionTypes.AUTH_START: return authStart(state, action);
	case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
	case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
	case actionTypes.AUTH_FAIL: return authFail(state, action);
	case actionTypes.USERS: return users(state, action);
	default:
		return state;
	}
};

export default reducer;



/*
import { FETCH_USER } from '../actions/actionTypes';

export default function (state = {}, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
} 
*/

