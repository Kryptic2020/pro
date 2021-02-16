import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import * as actions from '../../../store/actions';
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import Heading from '../../../components/UI/Heading/Heading';
import Select_custom from '../../../components/UI/SelectCustom/SelectCustom';
import SelectDate from '../../../components/UI/SelectDate/SelectDate';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import Button_custom from '../../../components/UI/ButtonCustom/ButtonCustom';

const initialState = {
	date: '', //
	//isLoading: true,
	staff: '', //
	staffID: '', //
	selection: [], //
	open: null, //
	msn: '', //
	dateOfremainingSpots: [], //
	timeOfremainingSpots: [], //
	service: '',
	specialty: '',
	id: null,
	fullName: null,
	appointment: '',
	appointmentHour: '',
	appointmentMinute: '',
	price: '', //
	service: '', //
	serviceName: '', //
	assignmentID: '',
	hour: [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'00',
	],
	minute: [
		'00',
		'05',
		'10',
		'15',
		'20',
		'25',
		'30',
		'35',
		'40',
		'45',
		'50',
		'55',
	],
};

class Calendar extends Component {
	state = initialState;

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	componentDidMount() {
		this.props.onFetchDates();
		this.props.onfetchServicesPrices();
		this.props.onfetchStaffAssignments();
		this.setState({
			id: this.props.location._id,
			fullName: this.props.location.fullName,
		});
		this.scrollToTop();
	}

	//SPECIALTY - COMPONENT 1

	specialtyHandler = (event) => {
		this.setState({
			...this.state,
			specialty: event.target.value,
			assignmentID: '',
		});
	};

	// Staff - Component 2
	staffHandleChange = async (event) => {
		let assignmentID = '';
		this.props.staffAssignments.map((m) => {
			if (
				m.staffID === event.target.value &&
				m.assignedSpecialty === this.state.specialty
			) {
				assignmentID = m._id;
			}
		});
		this.setState({
			...this.state,
			isLoading: true,
			staffID: event.target.value,
			assignmentID,
		});
	};

	//Service  - COMPONENT 3
	serviceHandler = async (event) => {
		this.setState({
			service: event.target.value,
			isLoading: true,
		});
		await this.props.servicesPrices.map((x) => {
			if (x.name === event.target.value) {
				this.setState({
					price: x.price,
					serviceName: x.name,
				});
			}
		});
		this.setState({
			isLoading: false,
		});
		this.props.staffAssignments.map((m) => {
			if (m.staffID.includes(this.state.staffID)) {
				this.setState({
					...this.state,
					staff: m.staff,
				});
			}
		});
	};

	//TIMEPICKER  - COMPONENT 5

	timepickerHourHandler = (event) => {
		this.setState({
			appointmentHour: event.target.value,
		});
	};

	timepickerMinuteHandler = (event) => {
		this.setState({
			appointmentMinute: event.target.value,
		});
	};

	timepickerHandleClose = () => {
		this.setState({ open: false });
	};

	timepickerHandleOpen = () => {
		this.setState({ open: true });
	};

	//SUBMIT - COMPONENT 6

	bookingHandler = () => {
		const time = this.state.appointmentHour
			.concat(':')
			.concat(this.state.appointmentMinute);
		const dataPost = {
			date: moment(new Date(this.state.date)).format(
				'YYYY-MM-DD[T00:00:00.000Z]'
			),
			specialty: this.state.specialty,
			service: this.state.serviceName,
			time: time,
			_id: this.state.id,
			fullName: this.state.fullName,
			price: this.state.price,
			staffID: this.state.staffID,
			staff: this.state.staff,
		};
		console.log(dataPost);
		axios
			.post('/api/booking/admnew', dataPost)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			});
		this.setState(initialState);
	};

	render() {
		const optionSpecialty = this.props.assignedSpecialties.map(
			(x, index) => (
				<option key={index} value={x}>
					{x}
				</option>
			)
		);
		let spec = [];
		this.props.staffAssignments.map((m) => {
			if (
				m.assignedSpecialty.includes(
					this.state.specialty
				)
			)
				spec.push(m);
		});
		const optionStaff = spec.map((y) => (
			<option key={y.staffID} value={y.staffID}>
				{y.staff}
			</option>
		));
		let service = [];
		this.props.servicesPrices.map((m) => {
			if (
				m.assignmentID === this.state.assignmentID
			) {
				service.push(m.name);
			}
		});
		const optionService = service.map((z, index) => (
			<option key={index} value={z}>
				{z}
			</option>
		));
		const optionsHour = this.state.hour
			.sort()
			.map((name, index) => (
				<option key={name + index} value={name}>
					{name}
				</option>
			));
		const optionsMinutes = this.state.minute
			.sort()
			.map((x, index) => (
				<option key={x + index} value={x}>
					{x}
				</option>
			));
		return (
			<>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<Heading
						text={'Let`s Create a Booking?'}
					/>
					<div className={classes.subcontainer}>
						<div className={classes.box}>
							{this.state.id ? (
								<div>
									<Select_custom
										display_icon={
											'none'
										}
										label={
											'Select Specialty'
										}
										options={
											optionSpecialty
										}
										onChange={
											this
												.specialtyHandler
										}
									/>
								</div>
							) : null}

							{this.state.specialty ? (
								<div>
									<Select_custom
										display_icon={
											'none'
										}
										label={
											'Select Staff'
										}
										options={
											optionStaff
										}
										onChange={(event) =>
											this.staffHandleChange(
												event
											)
										}
									/>
								</div>
							) : null}

							{this.state.staffID ? (
								<div
									className={
										classes.service
									}
								>
									<Select_custom
										display_icon={
											'none'
										}
										label={
											'Select Service'
										}
										options={
											optionService
										}
										onChange={
											this
												.serviceHandler
										}
									/>
								</div>
							) : null}

							{this.state.serviceName ? (
								<div
									className={
										classes.datebox
									}
								>
									<div
										className={
											classes.date
										}
									>
										<SelectDate
											label={
												'Select Date'
											}
											minDate={
												new Date()
											}
											selected={
												this.state
													.date
											}
											onChange={(
												date
											) => {
												this.setState(
													{
														date,
													}
												);
											}}
										/>{' '}
									</div>
									<div
										className={
											classes.price
										}
									>
										<Button_custom
											minWidth={
												'70px'
											}
											minHeight={
												'50px'
											}
											text={
												'$' +
												this.state
													.price
											}
										/>
									</div>
								</div>
							) : null}

							{this.state.date ? (
								<div>
									<Select_custom
										options={
											optionsHour
										}
										label={
											'Select Hour'
										}
										onChange={
											this
												.timepickerHourHandler
										}
										selected={
											this.state
												.appointmentHour
										}
									/>
									<Select_custom
										options={
											optionsMinutes
										}
										label={
											'Select Minutes'
										}
										onChange={
											this
												.timepickerMinuteHandler
										}
										selected={
											this.state
												.appointmentMinute
										}
									/>
								</div>
							) : null}
						</div>{' '}
						<ContinueButton
							disabled={
								!this.state.serviceName ||
								!this.state.id ||
								!this.state.specialty ||
								!this.state
									.appointmentHour ||
								!this.state
									.appointmentMinute ||
								!this.state.date ||
								!this.state.fullName
							}
							onClick={this.bookingHandler}
							text={'	Confirm Booking'}
						/>
					</div>
					<Link to='/my-slots'>
						<div className={classes.link}>
							Go To My Slots
						</div>
					</Link>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rawData: state.booking.rawData,
		existingDates: state.booking.existingDates,
		services: state.booking.services,
		assignedSpecialties:
			state.booking.assignedSpecialties,
		servicesPrices: state.booking.servicesPrices,
		staffAssignments: state.booking.staffAssignments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Calendar);
