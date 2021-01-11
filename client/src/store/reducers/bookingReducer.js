import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility2';

const initialState = {
	existingDates: '',
	rawData: '',
	services: [],
	openServices: [],
	allServices: [],
	specialties: [],
	servicesPrices: [],
	staffAssignments: [],
	assignedSpecialties:[],
};

const staffAssignments = (state, action) => {
	let specialties = [];
	action.data.map((m) => { if (!specialties.includes(m.assignedSpecialty)) specialties.push(m.assignedSpecialty); });
	return updateObject(state, {
		staffAssignments: action.data,
		assignedSpecialties:specialties
	})
};

const services = (state, action) => {
	return updateObject(state, {
		services: action.data,
	});
};

const servicesPrices = (state, action) => {
	return updateObject(state, {
		servicesPrices: action.data,
	});
};

const specialties = (state, action) => {
	return updateObject(state, {
		specialties: action.data,
	});
};

const openServices = (state, action) => {
	return updateObject(state, {
		openServices: action.openServices,
	});
};

const allServices = (state, action) => {
	return updateObject(state, {
		allServices: action.allServices,
	});
};

const fetchRawData = (state, action) => {
	return updateObject(state, {
		rawData: action.rawData,
	});
};

const fetchExistingDates = (state, action) => {
	return updateObject(state, {
		existingDates: action.existingDates,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.SERVICES: return services(state, action);
	case actionTypes.SERVICESPRICES: return servicesPrices(state, action);
	case actionTypes.FETCH_RAW_DATA: return fetchRawData(state, action);
	case actionTypes.FETCH_EXISTING_DATES: return fetchExistingDates(state, action);
	case actionTypes.OPEN_SERVICES: return openServices(state, action);
	case actionTypes.ALL_SERVICES: return allServices(state, action);
	case actionTypes.SPECIALTIES: return specialties(state, action);
	case actionTypes.STAFFASSIGNMENTS: return staffAssignments(state, action);
	default:
		return state;
	}
};

export default reducer;