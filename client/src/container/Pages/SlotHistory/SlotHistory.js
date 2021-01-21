import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CardSlotHistory from '../../../components/CardSlotHistory/CardSlotHistory';
import Headings from '../../../components/UI/Heading/Heading';
class Model extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<>
				<div className={classes.container}>
					<div className={classes.headings}>
						<Headings
							text={
								'Settings > Calendar History'
							}
						/>
					</div>
					{this.state.isLoading ? (
						<Spinner />
					) : null}

					<div className={classes.subcontainer}>
						<div className={classes.box}>
							<div className={classes.card}>
								<CardSlotHistory />
								<CardSlotHistory />
								<CardSlotHistory />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Model;
