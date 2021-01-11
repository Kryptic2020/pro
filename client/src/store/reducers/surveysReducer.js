import { FETCH_SURVEYS } from '../actions/actionTypes';

export default function (state = [], action) {
	//console.log(action);
	switch (action.type) {
	case FETCH_SURVEYS:return action.payload;
	default:
		return state;
	}
}