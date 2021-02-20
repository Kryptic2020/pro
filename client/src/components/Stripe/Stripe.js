import React from 'react';
import classes from './styles.module.css';
import StripeCheckout from 'react-stripe-checkout';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const Stripe = (props) => {
	return (
		<StripeCheckout
			name={props.name}
			description={props.description}
			amount={props.amount}
			currency={'AUD'}
			token={(token) => props.token(token)}
			//token={(token) => this.props.handleToken(token)} //callback from stripe with all details
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
			<CreditCardIcon className={classes.icon} />
		</StripeCheckout>
	);
};

export default Stripe;

//export default connect(null, actions)(Stripe);
