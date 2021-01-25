import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import SlotForm from '../../../components/SlotForm/SlotForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import CardSlot from '../../../components/CardSlot/CardSlot';

class MySlots extends Component {
	state = {
		isLoading: false,
		specialty: 'Dentist',
		staff: 'Amanda Powell',
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading
						text={'Dashboard > My Slots'}
					/>
					<div className={classes.box}>
						<SlotForm />
						<ContinueButton text={'SHOW'} />
					</div>
					<Heading
						text={
							'Dashboard > ' +
							' ' +
							this.state.specialty +
							' ' +
							' > ' +
							this.state.staff
						}
					/>
					<div className={classes.cards}>
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
						<CardSlot />
					</div>
				</div>
			</div>
		);
	}
}

export default MySlots;
