import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import SalesForm from '../../../components/SalesForm/SalesForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class Sales extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={'Dashboard > Sales'}
						/>
					</div>

					<div>
						<SalesForm />
						<ContinueButton text={'SHOW'} />
					</div>
				</div>
			</div>
		);
	}
}

export default Sales;
