import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../store/actions';
import moment from 'moment';
import { parseISO, addDays, subDays } from 'date-fns';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import BookingBar from '../../../components/BookingBar/BookingBar';
import CarouselSpecialty from '../../../components/CarouselSpecialty/CarouselSpecialty';
import CarouselStaff from '../../../components/CarouselStaff/CarouselStaff';
import CarouselService from '../../../components/CarouselService/CarouselService';
import FormDateTime from '../../../components/FormDateTime/FormDateTime';
import TermsConditions from '../../../components/TermsConditions/TermsConditions';

const initialState = {
	isLoading: false,
	staffAssignments: [],
	stage: 1,
	specialty: '',
	staff: '',
	staffID: '',
	assignmentID: '',
	service: '',
	booking: '',
	timeOfremainingSpots: [],
	dateOfremainingSpots: [],
	selection: [],
	date: '',
	appointment: '',
	daysCalendarView: '',
	open: false,
};
class BookNow extends Component {
	state = initialState;

	componentDidMount() {
		this.props.onfetchSpecialties();
		this.props.onfetchStaffAssignments();
		this.props.onfetchAdmins();
		this.props.onfetchServicesPrices();
		actions.scrollToTop();
	}
	clear = () => {
		console.log(new Date().getHours());
		this.setState(initialState);
	};
	check = () => {
		console.log(this.state.selection);
	};
	specialtyHandler = (props) => {
		this.setState({
			specialty: props.specialty,
			stage: 2,
		});
	};
	staffHandler = async (props) => {
		this.setState({
			isLoading: true,
			staff: props.staff,
			staffID: props.staffID,
			assignmentID: props.assignmentID,
			stage: 3,
		});

		const e = {
			staffID: props.staffID,
			specialty: this.state.specialty,
			today: moment(new Date()).format(
				'YYYY-MM-DD[T00:00:00.000Z]'
			),
		};

		axios
			.post('/api/booking/remainingspots', e)
			.then((res) => {
				console.log(res.data);
				this.setState({
					...this.state,
					timeOfremainingSpots: res.data,
				});

				if (res.data.length < 1) {
					this.setState({
						...this.state,
						msn:
							'This staff is not available, but you can still do a Waiting List Request',
						isLoading: false,
					});
				}

				let n = [];
				let z = [];
				res.data.map((profile) => {
					n.push(parseISO(profile.date));
				});
				const _id = { _id: props.staffID };

				axios
					.post(
						'/api/auth/daysCalendarView/get',
						_id
					)
					.then((res) => {
						const days = res.data.days;
						n.map((D) => {
							if (
								D <
									addDays(
										new Date(),
										days
									) &&
								D > subDays(new Date(), 1)
							) {
								z.push(D);
							}
							this.setState({
								...this.state,
								dateOfremainingSpots: z,
								isLoading: false,
							});
						});
					});
			});
	};
	serviceHandler = (props) => {
		this.setState({
			service: props.service,
			price: props.price,
			stage: 4,
		});
	};

	datepickerHandler = (date, props) => {
		this.setState({ date });
		const e = new Date(date).toLocaleDateString(
			'es-ES',
			{
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}
		);
		//console.log(e, new Date());
		let timeArray = [];
		if (
			//if todays date
			new Date().toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}) === e
		) {
			//take timearray for today if
			this.state.timeOfremainingSpots
				.sort()
				.map((profile) => {
					if (
						parseISO(
							profile.date
						).toLocaleDateString('es-ES', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						}) === e
					) {
						if (
							//if its not booked and speciaty matches
							!profile.isBooked &&
							profile.specialty ===
								this.state.specialty
						) {
							if (
								//if hours is not less then 2 hour ahead
								profile.time.substring(
									0,
									2
								) >
								new Date().getHours() + 2
							)
								console.log(profile.time);
							timeArray.push(profile.time);
						}
					}
				});
			if (timeArray.length < 1) {
				this.scrollToTop();
				this.setState({
					msn:
						'Ops, I am sorry, Its fully booked for today',
					appointment: '',
					staff: '',
					staffID: '',
					specialty: '',
					date: '',
					selection: [],
					serviceName: '',
					price: '',
				});
				document.getElementById(
					'specialty'
				).value = document.getElementById(
					'specialty'
				).defaultValue;
			}
		} else {
			this.state.timeOfremainingSpots
				.sort()
				.map((profile) => {
					if (
						parseISO(
							profile.date
						).toLocaleDateString('es-ES', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						}) === e
					) {
						if (
							!profile.isBooked &&
							profile.specialty ===
								this.state.specialty
						) {
							timeArray.push(profile.time);
							//console.log(profile.time.substring(0, 2), new Date().getHours());
						}
					}
				});
		}
		//P.time.substring(0, 2) > new Date().getHours()+2
		this.setState({ selection: timeArray });
	};

	timepickerHandler = (event) => {
		this.setState({
			appointment: event.target.value,
			booking:
				new Date(
					this.state.date
				).toLocaleDateString('es-ES', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				}) +
				' ' +
				event.target.value,
			stage: 5,
		});
	};

	timepickerHandleClose = () => {
		this.setState({ open: false });
	};

	timepickerHandleOpen = () => {
		this.setState({ open: true });
	};

	bookingHandler = async () => {
		this.setState({ ...this.state, isLoading: true });
		const dataPost = {
			date: moment(new Date(this.state.date)).format(
				'YYYY-MM-DD[T00:00:00.000Z]'
			),
			time: this.state.appointment,
			specialty: this.state.specialty,
			service: this.state.service,
			staffID: this.state.staffID,
			staff: this.state.staff,
			price: this.state.price,
		};
		//console.log(dataPost);
		await axios
			.post('/api/booking/new', dataPost)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
					this.props.history.push('/my-bookings');
				}, 3000);
			}); /*

		document.getElementById(
			'specialty'
		).value = document.getElementById(
			'specialty'
		).defaultValue;*/
		this.setState(initialState);
	};

	render() {
		return (
			<div>
				<button
					style={{
						height: '30px',
						width: '70px',
						position: 'absolute',
						marginLeft: '80%',
						marginTop: '20px',
						borderRadius: '10px',
					}}
					onClick={this.clear}
				>
					Back
				</button>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading text={'User > Book Now'} />

					<div className={classes.box}>
						<div
							className={classes.progressBar}
						>
							<ProgressBar
								stage={this.state.stage}
							/>
						</div>
						{this.state.stage === 1 ? (
							<CarouselSpecialty
								buttonName={'SELECT'}
								onClick_select={
									this.specialtyHandler
								}
								//display_select='none'
								specialties={
									this.props.specialties
								}
								staffAssignments={
									this.props
										.staffAssignments
								}
							/>
						) : null}

						{this.state.stage === 2 ? (
							<CarouselStaff
								onClick_select={
									this.staffHandler
								}
								specialty={
									this.state.specialty
								}
								admins={this.props.admins}
								staffAssignments={
									this.props
										.staffAssignments
								}
							/>
						) : null}

						{this.state.stage === 3 ? (
							<CarouselService
								onClick_select={
									this.serviceHandler
								}
								assignmentID={
									this.state.assignmentID
								}
								serviceArray={
									this.props
										.servicesPrices
								}
							/>
						) : null}

						{this.state.stage === 4 ? (
							<FormDateTime
								selected_date={
									this.state.date
								}
								onChange_date={
									this.datepickerHandler
								}
								minDate={new Date()}
								includeDates={
									this.state
										.dateOfremainingSpots
								}
								highlightDates={
									this.state
										.dateOfremainingSpots
								}
								open={this.state.open}
								onClose={
									this
										.timepickerHandleClose
								}
								onOpen={
									this
										.timepickerHandleOpen
								}
								value_time={
									this.state.appointment
								}
								selection={
									this.state.selection
								}
								onChange_time={
									this.timepickerHandler
								}
							/>
						) : null}
						{this.state.stage === 5 ? (
							<TermsConditions
								onClick_continue={
									this.bookingHandler
								}
							/>
						) : null}

						<div className={classes.bookingBar}>
							<BookingBar
								specialty={
									this.state.specialty
								}
								staff={this.state.staff}
								service={
									this.state.price
										? this.state
												.service +
										  ' $' +
										  this.state.price
										: null
								}
								booking={this.state.booking}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		admins: state.booking.admins,
		staffAssignments: state.booking.staffAssignments,
		users: state.auth.users,
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchSpecialties: () =>
			dispatch(actions.fetchSpecialties()),

		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
		onfetchAdmins: () =>
			dispatch(actions.fetchAdmins()),
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookNow);
