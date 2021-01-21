import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SlotForm from '../../../components/SlotForm/SlotForm';
import SelectWeekDays from '../../../components/SelectWeekDays/SelectWeekDays';
import Selector from '../../../components/Selector/Selector';
import Heading from '../../../components/UI/Heading/Heading';
import CardTimeTables from '../../../components/CardTimeTables/CardTimeTables';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class OverrideSlot extends Component {
	state = {
		isLoading: false,
		startDate: '',
		endDate: '',
		mon: false,
		tue: false,
		wed: false,
		thu: false,
		fri: false,
		sat: false,
		sun: false,
		selector: true,
	};

	handleMon = () => {
		this.setState((prevState) => {
			return {
				mon: !prevState.mon,
			};
		});
	};
	handleTue = () => {
		this.setState((prevState) => {
			return {
				tue: !prevState.tue,
			};
		});
	};
	handleWed = () => {
		this.setState((prevState) => {
			return {
				wed: !prevState.wed,
			};
		});
	};
	handleThu = () => {
		this.setState((prevState) => {
			return {
				thu: !prevState.thu,
			};
		});
	};
	handleFri = () => {
		this.setState((prevState) => {
			return {
				fri: !prevState.fri,
			};
		});
	};
	handleSat = () => {
		this.setState((prevState) => {
			return {
				sat: !prevState.sat,
			};
		});
	};
	handleSun = () => {
		this.setState((prevState) => {
			return {
				sun: !prevState.sun,
			};
		});
	};
	handleSelector = (e) => {
		this.setState({ selector: e.target.checked });
	};
	render() {
		return (
			<div className={classes.container}>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.subcontainer}>
					<div className={classes.heading1}>
						<Heading
							text={
								'	Settings > Override Slots'
							}
						/>
					</div>
					<div className={classes.form}>
						<SlotForm
							selected_start_date={
								this.state.startDate
							}
							selected_end_date={
								this.state.endDate
							}
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
							mon={this.state.mon}
							onClick_mon={this.handleMon}
							tue={this.state.tue}
							onClick_tue={this.handleTue}
							wed={this.state.wed}
							onClick_wed={this.handleWed}
							thu={this.state.thu}
							onClick_thu={this.handleThu}
							fri={this.state.fri}
							onClick_fri={this.handleFri}
							sat={this.state.sat}
							onClick_sat={this.handleSat}
							sun={this.state.sun}
							onClick_sun={this.handleSun}
						/>
					</div>
					<div className={classes.switch}>
						<Selector
							onChange={this.handleSelector}
						/>
					</div>

					<div className={classes.heading2}>
						<Heading
							text={
								'	Select the Time Table to be	Published.'
							}
						/>
					</div>

					<div className={classes.cards}>
						<CardTimeTables
							table_name={'test'}
							time_slots={'text'}
							button_select={true}
						/>{' '}
						<CardTimeTables
							table_name={'test'}
							time_slots={'text'}
							button_select={true}
						/>
					</div>
					<div className={classes.continue}>
						<ContinueButton
							text={'OVERRIDE SLOTS'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default OverrideSlot;
