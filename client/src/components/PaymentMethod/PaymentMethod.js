import React from 'react';
import classes from './styles.module.css';
import Stripe from '../Stripe/Stripe';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const PaymentMethod = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.title}>
					Select your preferred Payment Method
				</div>

				<div className={classes.options}>
					<div className={classes.card}>
						<label>Card</label>
						<Stripe
							name={props.name}
							description={props.description}
							amount={props.amount}
							token={props.token}
						/>
					</div>
					<div
						onClick={props.onClick_cash}
						className={classes.cash}
					>
						<label>Cash</label>
						<div>
							<LocalAtmIcon
								className={classes.icon}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethod;
