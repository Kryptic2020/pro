import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'; 
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Payments extends Component {
	render() {
		//debugger;
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={
					(token) => this.props.handleToken(token) //sending token
					//console.log(token)
				}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn-small #1e88e5 blue darken-1" style={{padding:'0px 5px',fontWeight:'bold'}}>$Top up</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);