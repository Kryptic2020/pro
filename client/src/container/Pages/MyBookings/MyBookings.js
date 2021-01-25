import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import CardMyBookings from '../../../components/CardMyBookings/CardMyBookings';

class MyBookings extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div>
						<Heading
							text={'User > My Bookings'}
						/>
					</div>
					<div className={classes.box}>
						<div className={classes.cards}>
							<CardMyBookings text='CANCEL' />
							<CardMyBookings text='CANCEL' />
							<CardMyBookings text='CANCEL' />
							<CardMyBookings text='CANCEL' />
							<CardMyBookings text='CANCEL' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyBookings;
