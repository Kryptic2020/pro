//import * as actionTypes from './actionTypes';

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};
