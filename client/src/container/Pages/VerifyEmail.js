import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

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
			<div
				className='container'
				style={{
					marginTop: '77px',
					minWidth: '320px',
					maxWidth: '380px',
				}}
			>
				<div
					style={{
						width: '100%',
						height: '20px',
					}}
				></div>
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
				</div>
				<div style={{ color: 'white' }}>
					<div
						style={{
							width: '100%',
							height: '20px',
						}}
					></div>
					<h4 style={{ color: 'yellow' }}>
						" Please open your Inbox and click
						verify email "
					</h4>
					<div
						style={{
							width: '100%',
							height: '20px',
						}}
					></div>
					<div>Hello, {this.props.fullName}</div>
					<div
						style={{
							width: '100%',
							height: '20px',
						}}
					></div>
					<div>
						Thanks for joining us! To finish
						signin up, you just need to confirm
						that we got your email right.{' '}
						<p>
							We just sent you a confirmation
							email to{' '}
							<span
								style={{
									color: 'yellow',
									fontSize: '18px',
								}}
							>
								{this.props.auth.email
									? this.props.auth.email
									: 'you'}
							</span>
							, if you don't find it please
							check your spam box.
						</p>
						{this.props.auth.email ? null : (
							<p>
								Alternativelly, please Log
								In and click at resend
								button to re-send the
								confirmation email
							</p>
						)}
					</div>
					<div
						style={{
							width: '100%',
							height: '40px',
						}}
					></div>
					{this.props.auth.email ? (
						<Button
							onClick={this.submitHandler}
						>
							Resend
						</Button>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		fullName: state.auth.fullName,
	};
};

export default connect(mapStateToProps, null)(VerifyEmail);
