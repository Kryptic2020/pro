import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './styles.module.css';
//import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import Alert from 'react-bootstrap/Alert';
import WavesSmall from '../../../components/UI/Iconsx/WavesSmall';
import Heading from '../../../components/UI/Heading/Heading';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class VerifyEmail extends Component {
	state = {
		msn: '',
	};

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	componentDidMount() {
		this.scrollToTop();
	}

	submitHandler = () => {
		console.log('submitted');
		const email = {
			email: this.props.auth.email,
		};
		axios
			.post('/api/auth/verify-email/resend', email)
			.then((res) => {
				this.setState({
					...this.state,
					msn: res.data,
				});
			});
	};

	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};

	render() {
		return (
			<div className={classes.container}>
				<div className={classes.wavesSmall}>
					<WavesSmall />
				</div>
				<div className={classes.subcontainer}>
					<div className={classes.box}>
						{/*
					<div className='center'>
						{this.state.msn ? (
							<Alert
								variant='warning '
								id='msn'
								onClick={this.hideMsn}
								style={{
									marginBottom: '20px',
									fontSize: '18px',
								}}
							>
								<Alert.Heading>
									{this.state.msn}
								</Alert.Heading>
							</Alert>
						) : null}
					</div>*/}
						<div className={classes.heading}>
							<Heading
								text='Please open your Inbox and click
						verify email'
							/>
						</div>
						<div className={classes.greatings}>
							Hello,{' '}
							{this.props.auth.fullName}
						</div>
						<div className={classes.info}>
							Thanks for joining us! To finish
							signin up, you just need to
							confirm that we got your email
							right.{' '}
							<p>
								We just sent you a
								confirmation email to{' '}
								<span>
									{this.props.auth.email
										? this.props.auth
												.email
										: 'you'}
								</span>
								, if you don't find it
								please check your spam box.
							</p>
							{this.props.auth
								.email ? null : (
								<p>
									Alternativelly, please
									<span> Login </span> and
									click on resend button
									to re-send the
									confirmation email
								</p>
							)}
						</div>
					</div>
				</div>

				<div className={classes.continue}>
					{this.props.auth.authenticated ? (
						<ContinueButton
							text='RESEND EMAIL'
							onClick={this.submitHandler}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, null)(VerifyEmail);
