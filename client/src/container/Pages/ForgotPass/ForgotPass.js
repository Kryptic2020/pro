import React, { Component } from 'react';
import classes from './styles.module.css';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import * as actions from '../../../store/actions';

class ForgotPass extends Component {
	state = {
		isLoading: false,
		email: '',
		isEmailValid: false,
		msn: '',
	};
	componentDidMount() {
		actions.scrollToTop();
	}

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

	submitHandler = (event) => {
		this.setState({ isLoading: true });

		const dataEmail = { email: this.state.email };
		axios
			.post('/api/forgot-pass', dataEmail)
			.then((res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
				actions.scrollToTop();
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 2000);
			})
			.catch((res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
			});
	};

	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				{this.state.msn ? (
					<div
						className={classes.msn}
						onClick={this.hideMsn}
					>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<div className={classes.headers}>
						We will send you a Link to reset
						your password.
					</div>
					<div>{this.emailRender()}</div>
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

export default ForgotPass;
