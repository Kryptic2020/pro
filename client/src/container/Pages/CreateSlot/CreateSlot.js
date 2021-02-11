import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import SlotForm from '../../../components/SlotForm/SlotForm';
import SelectWeekDays from '../../../components/SelectWeekDays/SelectWeekDays';
import Selector from '../../../components/Selector/Selector';
import Heading from '../../../components/UI/Heading/Heading';
import CardTimeTables from '../../../components/CardTimeTables/CardTimeTables';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const initialState = {
	msn: '',
	isLoading: false,
	startDate: '',
	endDate: '',
	timeTables: [],
	Mon: 'Empty',
	Tue: 'Empty',
	Wed: 'Empty',
	Thu: 'Empty',
	Fri: 'Empty',
	Sat: 'Empty',
	Sun: 'Empty',
	selector: true,
	specialty: '',
	staff: '',
	staffID: '',
	selectedTable: '',
};

class CreateSlot extends Component {
	state = initialState;
	componentDidMount() {
		actions.scrollToTop();
		this.fetchTimeTable(); //
		this.props.onFetchDates(); //
		this.props.onfetchStaffAssignments(); //
	}

	//TABLES
	fetchTimeTable = () => {
		axios
			.get('/api/timeTable/get')
			.then((res) => {
				this.setState({
					isLoading: false,
					timeTables: res.data,
				});
				if (this.state.timeTables.length < 1) {
					this.setState({
						msn: 'Warning: Time table missing',
					});
				}
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
					timeTables: [],
				});
			});
	};

	specialtyChangeHandler = async (event) => {
		//console.log(moment(new Date()).format('DD-MM-YYYY[T00:00:00.000Z]'));
		this.setState({
			...this.state,
			specialty: event.target.value,
		});
		const data = { specialty: event.target.value };
		await axios
			.post('/api/calendar/byspecialty', data)
			.then((res) => {
				let dates = [];
				res.data.map((e) => {
					dates.push(
						new Date(
							e.date
								.split('/')
								.reverse()
								.join('/')
						)
					);
				});
				this.setState({
					...this.state,
					calendarBySpecialty: dates,
				});
			});
	};
	staffHandleChange = (event) => {
		this.setState({
			...this.state,
			staffID: event.target.value,
			msn: '',
		});
		this.props.staffAssignments.map((m) => {
			if (m.staffID.includes(event.target.value))
				return this.setState({ staff: m.staff });
		});
	};

	//WEEKDAYS & OPEN/CLOSE VIEW - COMPONENT 5
	Mon = () => {
		if (this.state.Mon === 'Empty') {
			this.setState({ Mon: 'Mon' });
		} else {
			this.setState({ Mon: 'Empty' });
		}
	};

	Tue = () => {
		if (this.state.Tue === 'Empty') {
			this.setState({ Tue: 'Tue' });
		} else {
			this.setState({ Tue: 'Empty' });
		}
	};

	Wed = () => {
		if (this.state.Wed === 'Empty') {
			this.setState({ Wed: 'Wed' });
		} else {
			this.setState({ Wed: 'Empty' });
		}
	};

	Thu = () => {
		if (this.state.Thu === 'Empty') {
			this.setState({ Thu: 'Thu' });
		} else {
			this.setState({ Thu: 'Empty' });
		}
	};

	Fri = () => {
		if (this.state.Fri === 'Empty') {
			this.setState({ Fri: 'Fri' });
		} else {
			this.setState({ Fri: 'Empty' });
		}
	};

	Sat = () => {
		if (this.state.Sat === 'Empty') {
			this.setState({ Sat: 'Sat' });
		} else {
			this.setState({ Sat: 'Empty' });
		}
	};

	Sun = () => {
		if (this.state.Sun === 'Empty') {
			this.setState({ Sun: 'Sun' });
		} else {
			this.setState({ Sun: 'Empty' });
		}
	};
	unSelectTableHandler = () => {
		this.setState({ ...this.state, selectedTable: '' });
	};

	selectTableHandler = (props) => {
		console.log(props);
		this.setState({ selectedTable: props });
	};

	handleSelector = (e) => {
		this.setState({ selector: e.target.checked });
	};

	continueHandler = () => {
		actions.scrollToTop();
		this.setState({ ...this.state, isLoading: true });
		let currentDate = moment(this.state.startDate);
		let endDate = moment(this.state.endDate);
		let newArray = [];
		while (currentDate <= endDate) {
			if (
				currentDate
					.toString()
					.includes(this.state.Mon) === false &&
				currentDate
					.toString()
					.includes(this.state.Tue) === false &&
				currentDate
					.toString()
					.includes(this.state.Wed) === false &&
				currentDate
					.toString()
					.includes(this.state.Thu) === false &&
				currentDate
					.toString()
					.includes(this.state.Fri) === false &&
				currentDate
					.toString()
					.includes(this.state.Sat) === false &&
				currentDate
					.toString()
					.includes(this.state.Sun) === false
			) {
				newArray.push(new Date(currentDate));
			}
			currentDate = moment(currentDate).add(
				1,
				'days'
			);
		}
		let toLocaleArray = [];
		newArray.forEach((el) => {
			toLocaleArray.push(
				moment(new Date(el)).format(
					'YYYY-MM-DD[T00:00:00.000Z]'
				)
			);
		});
		let days = [];
		if (this.state.Mon !== 'Empty') {
			days.push(this.state.Mon);
		}
		if (this.state.Tue !== 'Empty') {
			days.push(this.state.Tue);
		}
		if (this.state.Wed !== 'Empty') {
			days.push(this.state.Wed);
		}
		if (this.state.Thu !== 'Empty') {
			days.push(this.state.Thu);
		}
		if (this.state.Fri !== 'Empty') {
			days.push(this.state.Fri);
		}
		if (this.state.Sat !== 'Empty') {
			days.push(this.state.Sat);
		}
		if (this.state.Sun !== 'Empty') {
			days.push(this.state.Sun);
		}

		const dataPost = {
			toLocaleArray,
			times: this.state.selectedTable,
			specialty: this.state.specialty,
			openView: this.state.selector,
			staffID: this.state.staffID,
			staff: this.state.staff,
			startDate: moment(
				new Date(this.state.startDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			endDate: moment(
				new Date(this.state.endDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			processedDate: moment(new Date()).format(
				'YYYY-MM-DD[T00:00:00.000Z]'
			),
			tableName: this.state.selectedTable.table_name,
			excludedDays: days,
		};
		axios
			.post('/api/calendar/post', dataPost)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				this.setState({
					...this.state,
					msn:
						'There was an error, please try again later!',
				});
			});
		this.setState({
			...this.state,
			startDate: '',
			staff: '',
			endDate: '',
			specialty: '',
			isLoading: false,
		});
		document.getElementById(
			'specialty'
		).value = document.getElementById(
			'specialty'
		).defaultValue;
	};
	render() {
		const optionsSpecialty = this.props.assignedSpecialties.map(
			(x, index) => (
				<option key={index} value={x}>
					{x}
				</option>
			)
		);
		const optionsStaff = this.props.staffAssignments.map(
			(m) =>
				m.assignedSpecialty.includes(
					this.state.specialty
				) ? (
					<option key={m._id} value={m.staffID}>
						{m.staff}
					</option>
				) : null
		);
		return (
			<div className={classes.container}>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.subcontainer}>
					<div className={classes.heading1}>
						<Heading
							text={
								'	Settings > Create New Slots'
							}
						/>
					</div>
					<div className={classes.form}>
						<SlotForm
							optionsSpecialty={
								optionsSpecialty
							}
							onChange_specialty={
								this.specialtyChangeHandler
							}
							optionsStaff={optionsStaff}
							selected_start={
								this.state.startDate
							}
							onChange_staff={
								this.staffHandleChange
							}
							selected_end_date={
								this.state.endDate
							}
							minDate_start={new Date()}
							minDate_end={
								this.state.startDate
							}
							onChange_start={(date) => {
								this.setState({
									startDate: date,
								});
							}}
							onChange_end={(date) => {
								this.setState({
									endDate: date,
								});
							}}
						/>
					</div>
					<div className={classes.days}>
						<SelectWeekDays
							mon={this.state.Mon}
							onClick_mon={this.Mon}
							tue={this.state.Tue}
							onClick_tue={this.Tue}
							wed={this.state.Wed}
							onClick_wed={this.Wed}
							thu={this.state.Thu}
							onClick_thu={this.Thu}
							fri={this.state.Fri}
							onClick_fri={this.Fri}
							sat={this.state.Sat}
							onClick_sat={this.Sat}
							sun={this.state.Sun}
							onClick_sun={this.Sun}
						/>
					</div>
					<div className={classes.switch}>
						<Selector
							borderRadius='0 0 10px 10px'
							text={
								'By default your new slots are Visible to clients, you can create your new Slots on Invisible mode by shifting the selector below'
							}
							on={
								this.state.selector
									? 'Visible'
									: 'Invisible'
							}
							checked={this.state.selector}
							onChange={this.handleSelector}
						/>
					</div>

					<div className={classes.heading2}>
						<Heading
							text={
								this.state.selectedTable ? (
									<>
										{
											'This is your selected Card of Slots.'
										}{' '}
										<p>
											{' '}
											{
												'Click "UNDO" to return or Click "CREATE SLOTS" to complete'
											}
										</p>
									</>
								) : (
									'	Select one Card of Slots to be Published.'
								)
							}
						/>
					</div>

					<div className={classes.cards}>
						{this.state.timeTables.map(
							(m, index) =>
								!this.state
									.selectedTable ? (
									<CardTimeTables
										key={
											m.timeTableName +
											index
										}
										buttonName='SELECT'
										table_name={
											m.timeTableName
										}
										times={m.times}
										button_select={true}
										onClick={
											this
												.selectTableHandler
										}
									/>
								) : null
						)}
						{this.state.selectedTable ? (
							<CardTimeTables
								buttonName='UNDO'
								backgroundColor='#24CD98'
								table_name={
									this.state.selectedTable
										.table_name
								}
								times={
									this.state.selectedTable
										.times
								}
								onClick={
									this
										.unSelectTableHandler
								}
								button_select={true}
							/>
						) : null}
					</div>
					<div className={classes.continue}>
						<ContinueButton
							onClick={this.continueHandler}
							disabled={
								!this.state.staff ||
								!this.state.specialty ||
								!this.state.startDate ||
								!this.state.endDate ||
								!this.state.selectedTable
							}
							text={'CREATE SLOTS'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		existingDates: state.booking.existingDates,
		assignedSpecialties:
			state.booking.assignedSpecialties,
		staffAssignments: state.booking.staffAssignments,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSlot);
