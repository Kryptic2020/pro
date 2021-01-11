import React, { Component } from 'react';
import classes from './Loginx.module.css';

class Loginx extends Component {
	render() {
		return (
			<div
				className={classes.container}
				style={{
					color: 'white',
					fontWeight: 'bold',
				}}
			>
				<div className={classes.navbar}>Navbar</div>
				<div className={classes.signup}>
					Sign up
				</div>
				<div className={classes.login}>Login</div>
				<div className={classes.fullname}>
					Full Name
				</div>
				<div className={classes.email}>Email</div>
				<div className={classes.password}>
					Password
				</div>
				<div className={classes.forgotpass}>
					Forgot Password?
				</div>
				<div className={classes.or}>Or</div>
				<div className={classes.loginwith}>
					Login With:
				</div>
				<div className={classes.facebookicone}>
					facebook icone
				</div>
				<div className={classes.googleicone}>
					google icone
				</div>
				<div className={classes.facebooklabel}>
					Facebook
				</div>
				<div className={classes.googlelabel}>
					Google
				</div>
				<div className={classes.buttoncontinue}>
					Continue{' '}
				</div>
				<div id=''></div>
			</div>
		);
	}
}

export default Loginx;
