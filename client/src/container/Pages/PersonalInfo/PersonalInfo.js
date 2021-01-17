import React, { Component } from 'react';
import classes from './styles.module.css';
import axios from 'axios';
//import Navbar from '../../../components/Navbar/Navbar';
import PersonalInfo from '../../../components/PersonalInfo/Personalinfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class PersonalInfoPage extends Component {
	state = {
		isLoading: false,
		firstName: '',
		lastName: '',
		phone: '',
	};
	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	};

	submitHandler = (event) => {
		const fullName =
			this.state.firstName.trim() +
			' ' +
			this.state.lastName.trim();
		this.setState({ isLoading: true });

		const data = { fullName, phone: this.state.phone };
		axios
			.post('/api/personal-info', data)
			.then((res) => {
				if (res.data) {
					this.setState({
						msn: res.data,
						isLoading: false,
					});
					alert(res.data);
				}
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
				<div className={classes.container}>
					<div className={classes.headers}>
						Please complete the sign up step
						below.
					</div>
					<div className={classes.personalInfo}>
						<PersonalInfo
							msg_phone={
								this.state.phone.length < 10
									? 'Min length is 10'
									: null
							}
							value={this.state.phone}
							onChange_firstName={(event) =>
								this.inputChangeHandler(
									event,
									'firstName'
								)
							}
							onChange_lastName={(event) =>
								this.inputChangeHandler(
									event,
									'lastName'
								)
							}
							onChange_phone={(phone) =>
								this.setState({ phone })
							}
						/>
					</div>
					<div className={classes.continueButton}>
						<ContinueButton
							disabled={
								!this.state.firstName ||
								!this.state.lastName ||
								this.state.phone.length < 10
							}
							text='Continue'
							onClick={this.submitHandler}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default PersonalInfoPage;
