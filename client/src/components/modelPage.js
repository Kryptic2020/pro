import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class MyBookings extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}></div>
				<div></div>
			</div>
		);
	}
}

export default MyBookings;
