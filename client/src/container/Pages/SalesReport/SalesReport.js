import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import CardSales from '../../../components/CardSales/CardSales';

class SalesReport extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading />
					<CardSales />
				</div>
				<div></div>
			</div>
		);
	}
}

export default SalesReport;
