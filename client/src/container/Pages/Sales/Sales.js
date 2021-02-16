import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import SalesForm from '../../../components/SalesForm/SalesForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import CardSales from '../../../components/CardSales/CardSales';

class Sales extends Component {
	state = {
		isLoading: false,
		bookings: [],
		specialty: '',
		staffID: '',
		staff: '',
		service: '',
		startDate: new Date(),
		endDate:
			new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
		forecast: false,
		total: '',
		registers: '',
	};

	componentDidMount = () => {
		this.props.onfetchSpecialties();
		this.props.onfetchStaffAssignments();
		this.props.onfetchServicesPrices();
		actions.scrollToTop();
	};
	executeScroll = () => this.myRef.scrollIntoView();

	staffHandler = (e) => {
		const r = e.target.value.split(',');
		this.setState({ staff: r[1], staffID: r[0] });
	};
	continueHandler = () => {
		this.setState({
			...this.state,
			isLoading: false,
		});
		const data = {
			specialty: this.state.specialty,
			staffID: this.state.staffID,
			staff: this.state.staff,
			service: this.state.service,
			startDate: moment(
				new Date(this.state.startDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			endDate: moment(
				new Date(this.state.endDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			forecast: this.state.forecast,
		};
		axios.post('/api/sales/get', data).then((res) => {
			actions.scrollToTop();
			const result = res.data.reduce(
				(total, currentValue) =>
					(total = total + currentValue.price),
				0
			);

			this.setState({
				...this.state,
				total: result,
				registers: res.data.length,
				msn: 'Updated',
				isLoading: false,
			});
			setTimeout(() => {
				this.executeScroll();
				this.setState({
					msn: '',
				});
			}, 2000);

			if (res.data.length < 1) {
				this.setState({
					msn: 'There is sale to be displayed.',
					isLoading: false,
				});
				actions.scrollToTop();
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			}
		});
	};
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
					<div className={classes.heading}>
						<Heading
							text={'Dashboard > Sales'}
						/>
					</div>

					<div>
						<SalesForm
							specialties={
								this.props.specialties
							}
							staffAssignments={
								this.props.staffAssignments
							}
							servicesPrices={
								this.props.servicesPrices
							}
							onChange_specialty={(e) =>
								this.setState({
									specialty:
										e.target.value,
								})
							}
							onChange_staff={
								this.staffHandler
							}
							onChange_service={(e) =>
								this.setState({
									service: e.target.value,
								})
							}
							onChange_startDate={(date) =>
								this.setState({
									startDate: date,
								})
							}
							onChange_endDate={(date) =>
								this.setState({
									endDate: date,
								})
							}
							onChange_forecast={(e) =>
								this.setState({
									forecast:
										e.target.value,
								})
							}
							selected_start={
								this.state.startDate
							}
							selected_end={
								this.state.endDate
							}
							on={
								this.state.forecast
									? 'Forecast'
									: 'Actual'
							}
							checked={this.state.forecast}
							onClick_switch={() => {
								this.setState(
									(prevState) => ({
										forecast: !prevState.forecast,
									})
								);
							}}
							minDate_end={
								this.state.startDate
							}
						/>
						<ContinueButton
							disabled={
								!this.state.startDate ||
								!this.state.endDate
							}
							text={'SHOW'}
							onClick={this.continueHandler}
						/>
					</div>
					<div
						ref={(ref) => (this.myRef = ref)}
						className={classes.heading2}
					>
						<Heading
							text={
								this.state.forecast
									? 'Dashboard > Sales Income > Forecast'
									: 'Dashboard > Sales Income > Actual'
							}
						/>
					</div>
					<div className={classes.cards}>
						<CardSales
							specialty={this.state.specialty}
							staff={this.state.staff}
							service={this.state.service}
							startDate={new Date(
								this.state.startDate
							).toLocaleDateString('es-ES', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
							})}
							endDate={new Date(
								this.state.endDate
							).toLocaleDateString('es-ES', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
							})}
							registers={this.state.registers}
							total={this.state.total}
						/>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		staffAssignments: state.booking.staffAssignments,
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

		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sales);
