import React, { Component } from 'react';
import classes from './styles.module.css';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const initialState = {
	password: '',
	msn: '',
	isLoading: false,
	confirmPassword: '',
	token: '',
};

class ResetPass extends Component {
	state = initialState;

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	componentDidMount() {
		this.setState({
			token: new URLSearchParams(
				this.props.location.search
			).get('key'),
		});
		//console.log(new Date().toLocaleShortDateString());
		this.scrollToTop();
	}

	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};

	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	};

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
					className={classes.icon}
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

	//Confirm Password

	confirmPasswordRender() {
		return (
			<div>
				<Input
					id='confirmPassword'
					label='Confirm Password'
					msg={
						this.state.confirmPassword.length <
						6
							? 'Min length is 6'
							: null
					}
					onChange={(event) =>
						this.inputChangeHandler(
							event,
							'confirmPassword'
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
					className='right'
				></span>
			</div>
		);
	}

	//Submit  - Component 2
	submitHandler = (event) => {
		if (
			this.state.password.length < 6 ||
			this.state.password !==
				this.state.confirmPassword
		) {
			this.setState({
				msn:
					'Password has to match confirm Password with min length of 6 caracteres',
			});
			setTimeout(() => {
				this.setState({
					msn: '',
				});
			}, 2000);
		} else {
			this.setState({ isLoading: true });
			const data = {
				password: this.state.password,
				token: this.state.token,
			};
			axios
				.post('/api/reset-pass', data)
				.then((res) => {
					if (res.data) {
						this.setState({
							msn: res.data,
							isLoading: false,
						});
						setTimeout(() => {
							if (
								res.data.includes('Updated')
							) {
								this.props.history.push(
									'/loginx'
								);
							}
							this.setState({
								msn: '',
							});
						}, 2000);
					}
				})
				.catch((res) => {
					this.setState({ msn: res.data });
					this.setState(initialState);
				});
		}
	};
	render() {
		return (
			<div>
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div className={classes.headers}>
						Your new password.
					</div>
					<div>{this.passwordRender()}</div>
					<div>
						{this.confirmPasswordRender()}
					</div>
				</div>
				<div className={classes.continueButton}>
					<ContinueButton
						text='Continue'
						onClick={this.submitHandler}
					/>
				</div>
			</div>
		);
	}
}

export default ResetPass;
