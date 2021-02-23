import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SlidePhoto from '../../../components/SlidePhoto/SlidePhoto';
import * as actions from '../../../store/actions';
import moment from 'moment';
//import { parseISO, addDays, subDays } from 'date-fns';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import BookingBar from '../../../components/BookingBar/BookingBar';
import CarouselSpecialty from '../../../components/CarouselSpecialty/CarouselSpecialty';
import CarouselStaff from '../../../components/CarouselStaff/CarouselStaff';
import CarouselService from '../../../components/CarouselService/CarouselService';
import FormDateTime from '../../../components/FormDateTime/FormDateTime';
import TermsWaitingList from '../../../components/TermsWaitingList/TermsWaitingList';

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
class WaitingList extends Component {
	state = initialState;

	componentDidMount() {
		this.props.onfetchSpecialties();
		this.props.onfetchStaffAssignments();
		this.props.onfetchAdmins();
		this.props.onfetchServicesPrices();
		actions.scrollToTop();
	}
	clear = () => {
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
	staffHandler = (props) => {
		this.setState({
			//isLoading: true,
			staff: props.staff,
			staffID: props.staffID,
			assignmentID: props.assignmentID,
			stage: 3,
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

	waitingListRequestHandler = async () => {
		this.setState({ ...this.state, isLoading: true });
		const dataPost = {
			date: moment(new Date(this.state.date)).format(
				'YYYY-MM-DD[T00:00:00.000Z]'
			),
			time: this.state.appointment,
			specialty: this.state.specialty,
			service: this.state.service,
			staff: this.state.staff,
			requestedAt: new Date(),
			//	message:this.state.message
		};
		await axios
			.post('/api/booking/waiting-list', dataPost)
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
			});
		this.setState(initialState);
	};

	render() {
		/*
		const unique = [
			...new Map(
				this.props.staffAssignments.map((item) => [
					item.staffID,
					item,
				])
			).values(),
		];*/
		let staffArray = [];
		let assignments = [];

		this.props.staffAssignments.forEach((w, index) => {
			this.props.admins
				.filter((el) => el._id === w.staffID)
				.forEach((e) => {
					assignments.push({
						_id: w._id,
						staff: w.staff,
						staffID: w.staffID,
						assignedSpecialty:
							w.assignedSpecialty,
						photo: e.photo,
					});
				});
		});
		assignments.forEach((t, index) => {
			if (
				t.assignedSpecialty === this.state.specialty
			) {
				staffArray.push(
					<SlidePhoto
						//display={'flex'}
						onClick={this.staffHandler}
						key={t._id + index}
						photo={t.photo}
						staff={t.staff}
						staffID={t.staffID}
						assignmentID={t._id}
					/>
				);
			}
		});

		return (
			<div>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}

				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading text={'User > Waiting List'} />{' '}
				</div>
				<div className={classes.box}>
					<div className={classes.progressBar}>
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
							specialties={
								this.props.specialties
							}
							staffAssignments={
								this.props.staffAssignments
							}
						/>
					) : null}

					{this.state.stage === 2 ? (
						<CarouselStaff
							staffArray={staffArray}
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
								this.props.servicesPrices
							}
						/>
					) : null}

					{this.state.stage === 4 ? (
						<FormDateTime
							selected_date={this.state.date}
							onChange_date={
								this.datepickerHandler
							}
							minDate={new Date()}
							open={this.state.open}
							onClose={
								this.timepickerHandleClose
							}
							onOpen={
								this.timepickerHandleOpen
							}
							selection={[
								'Morning',
								'Afternoon',
								'Evening',
								'Anytime',
							]}
							onChange_time={
								this.timepickerHandler
							}
						/>
					) : null}
					{this.state.stage === 5 ? (
						<TermsWaitingList
							onClick_continue={
								this
									.waitingListRequestHandler
							}
						/>
					) : null}

					<div className={classes.bookingBar}>
						<BookingBar
							specialty={this.state.specialty}
							staff={this.state.staff}
							service={
								this.state.price
									? this.state.service +
									  ' $' +
									  this.state.price
									: null
							}
							booking={this.state.booking}
						/>
						<div
							className={classes.restart}
							onClick={this.clear}
						>
							Restart
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
)(WaitingList);
