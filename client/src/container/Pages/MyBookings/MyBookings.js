import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { parseISO } from 'date-fns';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import CardMyBookings from '../../../components/CardMyBookings/CardMyBookings';

class MyBookings extends Component {
	state = {
		isLoading: false,
		msn: '',
		myBooking: [],
		cancelBooking: '',
	};

	componentDidMount() {
		this.fetchMyBookings();
		actions.scrollToTop();
	}

	fetchMyBookings = () => {
		this.setState({ isLoading: true });
		axios
			.get('/api/my-booking/history/get')
			.then((res) => {
				this.setState({
					...this.state,
					myBookings: res.data.sort().reverse(),
					isLoading: false,
				});

				if (res.data.length < 1) {
					this.setState({
						msn:
							'There is no booking to be displayed.',
						isLoading: false,
					});
					setTimeout(() => {
						this.setState({
							msn: '',
						});
					}, 3000);
				}
			});
	};
	handleModalShow = (
		_id,
		specialty,
		date,
		time,
		service,
		bookedByName
	) => {
		const cancelBooking = {
			_id,
			specialty,
			date,
			time,
			service,
			bookedByName,
		};
		this.setState({
			...this.state,
			modalShow: true,
			cancelBooking,
		});
	};

	handleModalClose = () => {
		this.setState({
			modalShow: false,
			cancelBooking: '',
		});
	};

	cancelBookingHandler = () => {
		this.setState({ isLoading: true });
		const data = this.state.cancelBooking;
		console.log(data);
		axios
			.post('/api/booking/cancel', data)
			.then((res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				//console.log(err);
			});
		this.setState({ isLoading: false });
		this.fetchMyBookings();
		this.handleModalClose();
	};

	cancelBookingModalRender() {
		return (
			<div>
				<Modal
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Cancel Booking
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{' '}
						<p>
							Hi,{' '}
							{
								this.state.cancelBooking
									.bookedByName
							}{' '}
							!
						</p>
						You're trying to Cancel this
						Booking, are you sure?!
					</Modal.Body>
					<Modal.Footer>
						<span className='left'>
							<Button
								variant='secondary'
								onClick={
									this.handleModalClose
								}
							>
								Close
							</Button>
						</span>
						<span>
							<Button
								className='right'
								variant='danger'
								onClick={
									this
										.cancelBookingHandler
								}
							>
								Cancel Booking
							</Button>
						</span>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					{this.cancelBookingModalRender()}

					<div>
						<Heading
							text={'User > My Bookings'}
						/>
					</div>
					<div className={classes.box}>
						<div className={classes.cards}>
							{' '}
							{this.state.myBookings
								? this.state.myBookings.map(
										(w, index) => (
											<CardMyBookings
												key={
													w._id +
													index
												}
												date={new Date(
													w.date
												).toLocaleDateString(
													'es-ES',
													{
														year:
															'numeric',
														month:
															'numeric',
														day:
															'numeric',
													}
												)}
												day={new Date(
													w.date
												).toLocaleDateString(
													'en-AU',
													{
														weekday:
															'long',
													}
												)}
												time={
													w.time
												}
												service={
													w.service
												}
												specialty={
													w.specialty
												}
												price={
													w.price
												}
												staff={
													w.staff
												}
												onClick={() =>
													this.handleModalShow(
														w.bookingID,
														w.specialty,
														w.date,
														w.time,
														w.service,
														w.bookedByName
													)
												}
												disabled={
													w.isCancelled
														? true
														: false
												}
												text={
													w.isCancelled
														? 'CANCELLED'
														: 'CANCEL'
												}
												color={
													w.isCancelled
														? '#ffffff'
														: null
												}
												backgroundColor={
													w.isCancelled
														? 'red'
														: null
												}
												display={
													new Date(
														w.date
													).toLocaleDateString(
														'es-ES',
														{
															year:
																'numeric',
															month:
																'numeric',
															day:
																'numeric',
														}
													) <
														new Date().toLocaleDateString(
															'es-ES',
															{
																year:
																	'numeric',
																month:
																	'numeric',
																day:
																	'numeric',
															}
														) &&
													!w.isCancelled
														? 'none'
														: null
												}
												visibility={
													new Date(
														w.date
													).toLocaleDateString(
														'es-ES',
														{
															year:
																'numeric',
															month:
																'numeric',
															day:
																'numeric',
														}
													) ===
														new Date().toLocaleDateString(
															'es-ES',
															{
																year:
																	'numeric',
																month:
																	'numeric',
																day:
																	'numeric',
															}
														) &&
													!w.isCancelled &&
													w.time.substring(
														0,
														2
													) <
														new Date().getHours() +
															2
														? 'hidden'
														: null
												}
											/>
										)
								  )
								: null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyBookings;
