import React from 'react';
import classes from './styles.module.css';
import FacebookIcone from '../UI/Iconsx/Facebook';
import GoogleIcone from '../UI/Iconsx/Google';

const LoginWith = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.loginWith}>
				Login With
			</div>
			<div className={classes.icones}>
				<div className={classes.facebookIcone}>
					<FacebookIcone width='47px' />
					<div className={classes.textFacebook}>
						Facebook
					</div>
				</div>
				<div className={classes.googleIcone}>
					<GoogleIcone width='40px' />
					<div className={classes.textGoogle}>
						Google
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginWith;
