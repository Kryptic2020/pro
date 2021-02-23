import * as actionTypes from './actionTypes';
import axios from 'axios';

export const staffAssignments = (data) => {
	return {
		type: actionTypes.STAFFASSIGNMENTS,
		data: data,
	};
};

export const fetchStaffAssignments = () => (dispatch) => {
	axios.get('/api/staffassignments/get').then((res) => {
		const data = res.data;
		dispatch(staffAssignments(data));
	});
};

export const admins = (data) => {
	return {
		type: actionTypes.ADMINS,
		data: data,
	};
};
export const fetchAdmins = () => async (dispatch) => {
	await axios.get('/api/admins/get').then((res) => {
		const data = res.data;
		dispatch(admins(data));
	});
};

export const services = (data) => {
	return {
		type: actionTypes.SERVICES,
		data: data,
	};
};

export const fetchServices = () => (dispatch) => {
	axios.get('/api/service').then((res) => {
		const data = res.data;
		dispatch(services(data));
	});
};

export const servicesPrices = (data) => {
	return {
		type: actionTypes.SERVICESPRICES,
		data: data,
	};
};

export const fetchServicesPrices = () => (dispatch) => {
	axios.get('/api/serviceprice/get').then((res) => {
		const data = res.data;
		dispatch(servicesPrices(data));
	});
};

export const specialties = (data) => {
	return {
		type: actionTypes.SPECIALTIES,
		data: data,
	};
};

export const fetchSpecialties = () => (dispatch) => {
	axios.get('/api/specialties/get').then((res) => {
		const data = res.data;
		dispatch(specialties(data));
	});
};

export const fetchRawData = (rawData) => {
	return {
		type: actionTypes.FETCH_RAW_DATA,
		rawData: rawData,
	};
};

export const openServices = (s) => {
	return {
		type: actionTypes.OPEN_SERVICES,
		openServices: s,
	};
};

export const allServices = (x) => {
	return {
		type: actionTypes.ALL_SERVICES,
		allServices: x,
	};
};

export const fetchExistingDates = (existingDates) => {
	return {
		type: actionTypes.FETCH_EXISTING_DATES,
		existingDates: existingDates,
	};
};

export const fetchDates = () => (dispatch) => {
	axios.get('/api/calendar/get').then((res) => {
		const rawData = res.data;
		dispatch(fetchRawData(rawData));
		let s = [];
		rawData.forEach((j) => {
			if (!j.isBooked) {
				if (s.includes(j.service) === false)
					s.push(j.service);
			}
		});
		dispatch(openServices(s));
		let x = [];
		rawData.forEach((k) => {
			if (x.includes(k.service) === false)
				x.push(k.service);
		});
		dispatch(allServices(x));
		let n = [];
		rawData.forEach((profile) => {
			//n.push(new Date(profile.date));
			n.push(
				new Date(
					profile.date
						.split('/')
						.reverse()
						.join('/')
				),
				profile.service
			);
		}); //console.log(n);
		dispatch(fetchExistingDates(n));
	});
};
