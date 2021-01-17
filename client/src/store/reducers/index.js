import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	booking: bookingReducer,
});
