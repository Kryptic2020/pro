import React, { Component } from 'react';
import {
	Redirect,
	Link,
	withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './styles.module.css';
//import useStyles from './styles';
import Alert from 'react-bootstrap/Alert';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TriangleIcone from '../../../components/UI/Iconsx/Triangle';
import LoginWith from '../../../components/LoginWith/LoginWith';
import PersonalInfo from '../../../components/PersonalInfo/Personalinfo';

class Loginx extends Component {
	state = {
		isSignup: false,
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phone: '',
		isEmailValid: false,
		isLoading: false,
		msn: '',
	};
	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	hideMsn = () => {
		this.setState({
			...this.state,
			msn: '',
			isLoading: false,
		});
		window.location.reload(false);
	};

	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
		this.scrollToTop();
	}

	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	};

	//Email
	emailChangeHandler = (event) => {
		this.setState({
			...this.state,
			email: event.target.value,
		});

		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const isValid = pattern.test(event.target.value);
		if (isValid) {
			this.setState({ isEmailValid: true });
		} else {
			this.setState({ isEmailValid: false });
		}
	};
	emailRender() {
		return (
			<div>
				<Input
					autocomplete='on'
					label='Email Address'
					msg={
						this.state.isEmailValid
							? null
							: 'A valid email is required'
					}
					onChange={this.emailChangeHandler}
					type='email'
				></Input>
			</div>
		);
	}

	//Password
	togglePassHandler = () => {
		this.setState((prevState) => {
			return {
				passwordVisible: !prevState.passwordVisible,
			};
		});
	};

	passwordRender() {
		return (
			<div>
				<Input
					id='password'
					label='Password'
					msg={
						this.state.password.length < 6
							? 'Min length is 6'
							: null
					}
					onChange={(event) =>
						this.inputChangeHandler(
							event,
							'password'
						)
					}
					type={
						this.state.passwordVisible
							? 'text'
							: 'password'
					}
				></Input>
				<span
					onClick={this.togglePassHandler}
					style={{
						position: 'relative',
						marginTop: '-50px',
						marginRight: '10px',
					}}
					className='right'
				>
					{this.state.passwordVisible ? (
						<VisibilityIcon
							fontSize='large'
							color='action'
						/>
					) : (
						<VisibilityOffIcon
							fontSize='large'
							color='action'
						/>
					)}
				</span>
			</div>
		);
	}

	submitHandler = () => {
		const fullName =
			this.state.firstName.trim() +
			' ' +
			this.state.lastName.trim();
		const auth = () => {
			this.props.onAuth(
				this.state.email,
				this.state.password,
				fullName,
				this.state.phone,
				this.state.isSignup,
				this.props.history
			);
			this.setState({
				isLoading: true,
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				phone: '',
			});
		};

		const errorMsg = () => {
			alert('All fields are required.');
		};
		if (this.state.isSignup) {
			if (
				!this.state.isEmailValid ||
				this.state.password.length < 6 ||
				!this.state.firstName ||
				!this.state.lastName ||
				this.state.phone.length < 10
			) {
				errorMsg();
			} else {
				auth();
			}
		} else {
			if (
				!this.state.isEmailValid ||
				this.state.password.length < 6
			) {
				errorMsg();
			} else {
				auth();
			}
		}
	};

	selectHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	renderForgotText = () => {
		return (
			<>
				<div className={classes.forgotLink}>
					<Link
						className={classes.forgotLink_text}
						to='/forgot-pass'
					>
						Forgot Password?
					</Link>
				</div>
				<div className={classes.or}>- OR -</div>
			</>
		);
	};

	render() {
		let authRedirect = null;
		if (this.props.authenticated) {
			authRedirect = (
				<Redirect
					to={this.props.authRedirectPath}
				/>
			);
		}
		return (
			<>
				{this.props.authenticated ? (
					<Redirect to='/' />
				) : null}
				<div className={classes.alert}>
					{this.props.msnErr &&
					this.props.msnErr.length > 3 ? (
						<Alert
							variant='warning '
							id='msn'
							onClick={this.hideMsn}
							style={{
								marginBottom: '20px',
							}}
						>
							<Alert.Heading>
								{this.props.msnErr}

								<p>
									click here and try
									again!{' '}
								</p>
							</Alert.Heading>
						</Alert>
					) : null}
				</div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div className={classes.headers}>
						<div
							onClick={this.selectHandler}
							className={
								this.state.isSignup
									? classes.selected
									: classes.unselected
							}
						>
							SIGN UP
						</div>
						<div
							onClick={this.selectHandler}
							className={
								this.state.isSignup
									? classes.unselected
									: classes.selected
							}
						>
							LOGIN
						</div>
					</div>
					<div
						className={
							this.state.isSignup
								? classes.triangleSignup
								: classes.triangleLogin
						}
					>
						<TriangleIcone
							height='30px'
							width='30px'
						/>
					</div>

					<div className={classes.loginForm}>
						<div>{this.emailRender()}</div>
						<div>{this.passwordRender()}</div>
					</div>
					{this.state.isSignup
						? null
						: this.renderForgotText()}

					<div className={classes.loginWith}>
						{this.state.isSignup ? null : (
							<LoginWith />
						)}
					</div>
					<div className={classes.personalInfo}>
						{this.state.isSignup ? (
							<PersonalInfo
								msg={
									this.state.phone
										.length < 10
										? 'Min length 10.'
										: null
								}
								onChange_firstName={(
									event
								) =>
									this.inputChangeHandler(
										event,
										'firstName'
									)
								}
								onChange_lastName={(
									event
								) =>
									this.inputChangeHandler(
										event,
										'lastName'
									)
								}
								onChange_phone={(phone) =>
									this.setState({ phone })
								}
								value={this.state.phone}
							/>
						) : null}
					</div>
					<div
						className={
							this.state.isSignup
								? classes.continueButton2
								: classes.continueButton
						}
					>
						<ContinueButton
							text='Continue'
							onClick={this.submitHandler}
						/>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		authenticated: state.auth.authenticated,
		msnErr: state.auth.msnErr,
		authRedirectPath: state.auth.authRedirectPath,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (
			email,
			password,
			fullName,
			isSignup,
			history
		) =>
			dispatch(
				actions.auth(
					email,
					password,
					fullName,
					isSignup,
					history
				)
			),
		onSetAuthRedirectPath: () =>
			dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Loginx));
