import React, { Component } from 'react';
import classes from './styles.module.css';
//import useStyles from './styles';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/LoginForm/LoginForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

import TriangleIcone from '../../../components/UI/Iconsx/Triangle';
import LoginWith from '../../../components/LoginWith/LoginWith';
import PersonalInfo from '../../../components/PersonalInfo/Personalinfo';

const Loginx = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		/*const { email, password } = values;

		if (email !== '' && password !== '') {
			console.log('Submited');
		} else {
			//handleErrors();
		}*/
	};

	return (
		<>
			<div className={classes.container}>
				<div className={classes.headers}>
					<div className={classes.unselected}>
						SIGN UP
					</div>
					<div className={classes.selected}>
						LOGIN
					</div>
				</div>
				<div className={classes.triangleLogin}>
					<TriangleIcone width='30px' />
				</div>

				<div className={classes.loginForm}>
					<LoginForm />
				</div>

				<div className={classes.forgotLink}>
					<Link to='/forgot-password'>
						Forgot Password?
					</Link>
					<div className={classes.or}>- OR -</div>
				</div>

				<div className={classes.loginWith}>
					<LoginWith />
				</div>
			</div>
			<div className={classes.personalInfo}>
				<PersonalInfo />
			</div>

			<div className={classes.continueButton}>
				<ContinueButton
					text='Continue'
					onClick={handleSubmit}
				/>
			</div>
		</>
	);
};

export default Loginx;
