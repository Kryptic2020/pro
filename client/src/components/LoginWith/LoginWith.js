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
					<a href='/auth/facebook'>
						<FacebookIcone width='47px' />
						<div
							className={classes.textFacebook}
						>
							Facebook
						</div>
					</a>
				</div>
				<div className={classes.googleIcone}>
					<a href='/auth/google'>
						<GoogleIcone width='40px' />
						<div className={classes.textGoogle}>
							Google
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default LoginWith;
