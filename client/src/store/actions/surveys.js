import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS} from './actionTypes';
import * as actionTypes from './actionTypes';

export const authCheck = () => {
	return {
		type: actionTypes.AUTH_CHECK
	};
};
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
	if (res.data) { dispatch(authCheck()); };
	
  
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);
	//console.log(values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};




/*
export const submitRegister = values => async dispatch => {
  const res = await axios.post('/api/register', values);
  //console.log(values);

  dispatch({ type: FETCH_USER, payload: res.data });
}*/



