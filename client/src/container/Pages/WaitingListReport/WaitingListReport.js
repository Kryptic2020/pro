import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import CardWaitingListReport from '../../../components/CardWaitingListReport/CardWaitingListReport';

class WaitingListReport extends Component {
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
							text={
								'User > Waiting List Report'
							}
						/>
					</div>
					<div className={classes.box}>
						<div className={classes.cards}>
							<CardWaitingListReport />
							<CardWaitingListReport />
							<CardWaitingListReport />
							<CardWaitingListReport />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WaitingListReport;
