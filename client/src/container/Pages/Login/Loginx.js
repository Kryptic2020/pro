import React, { Component } from 'react';
import classes from './styles.module.css';
//import useStyles from './styles';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/LoginForm/LoginForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

import TriangleIcone from '../../../components/UI/Iconsx/Triangle';
import LoginWith from '../../../components/LoginWith/LoginWith';
import PersonalInfo from '../../../components/PersonalInfo/Personalinfo';

class Loginx extends Component {
	state = {
		isLogin: true,
	};
	/*const handleSubmit = (event) => {
		event.preventDefault();
		const { email, password } = values;

		if (email !== '' && password !== '') {
			console.log('Submited');
		} else {
			//handleErrors();
		}
	};*/

	selectHandler = () => {
		this.setState((prevState) => {
			return { isLogin: !prevState.isLogin };
		});
	};

	renderForgotText = () => {
		return (
			<>
				<div className={classes.forgotLink}>
					<Link to='/forgot-password'>
						Forgot Password?
					</Link>
					<div className={classes.or}>- OR -</div>
				</div>
			</>
		);
	};

	render() {
		return (
			<>
				<div className={classes.container}>
					<div className={classes.headers}>
						<div
							onClick={this.selectHandler}
							className={
								this.state.isLogin
									? classes.unselected
									: classes.selected
							}
						>
							SIGN UP
						</div>
						<div
							onClick={this.selectHandler}
							className={
								this.state.isLogin
									? classes.selected
									: classes.unselected
							}
						>
							LOGIN
						</div>
					</div>
					<div
						className={
							this.state.isLogin
								? classes.triangleLogin
								: classes.triangleSignup
						}
					>
						<TriangleIcone width='30px' />
					</div>

					<div className={classes.loginForm}>
						<LoginForm />
					</div>
					{this.state.isLogin
						? this.renderForgotText()
						: null}

					<div className={classes.loginWith}>
						{this.state.isLogin ? (
							<LoginWith />
						) : null}
					</div>
					<div className={classes.personalInfo}>
						{this.state.isLogin ? null : (
							<PersonalInfo />
						)}
					</div>
					<div className={classes.continueButton}>
						<ContinueButton
							text='Continue'
							//onClick={handleSubmit}
						/>
					</div>
				</div>
			</>
		);
	}
}

export default Loginx;
