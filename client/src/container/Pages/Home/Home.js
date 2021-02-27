import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SlidePhoto from '../../../components/SlidePhoto/SlidePhoto';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Wave from '../../../components/UI/Iconsx/WavesSmall';
import Heading from '../../../components/UI/Heading/Heading';
import ButtonBookNow from '../../../components/UI/ButtonBookNow/ButtonBookNow';
import EasySteps from '../../../components/EasySteps/EasySteps';
import CarouselSpecialty from '../../../components/CarouselSpecialty/CarouselSpecialty';
import CarouselStaff from '../../../components/CarouselStaff/CarouselStaff';
import CarouselService from '../../../components/CarouselService/CarouselService';
import axios from 'axios';

class Home extends Component {
	state = {
		isLoading: false,
	};

	componentDidMount = async () => {
		await this.props.onfetchSpecialties();
		await this.props.onfetchStaffAssignments();
		this.setState({
			isLoading: true,
		});
		actions.scrollToTop();
		this.props.onfetchAdmins();
		this.props.onfetchServicesPrices();
		this.setState({
			isLoading: false,
		});
	};

	test = () => {
		console.log('hello');
		axios.get('/api/email');
	};
	render() {
		console.log(this.props.staffAssignments);
		let a = [];
		this.props.staffAssignments.forEach((x) => {
			if (!a.includes(x.staffID)) {
				a.push(x.staffID);
			}
		});
		let staffArray = [];
		a.forEach((u, index) => {
			this.props.admins.forEach((z) => {
				if (u === z._id) {
					staffArray.push(
						<SlidePhoto
							display={'none'}
							key={u + index}
							photo={z.photo}
							staff={z.fullName}
						/>
					);
				}
			});
		});
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div className={classes.box}>
						<div
							onClick={this.test}
							className={classes.header}
						>
							<Heading
								color='#ffffff'
								text='Hairdresser & Manicurist Appointments'
							/>
						</div>
						<div className={classes.button}>
							<Link
								to={
									this.props.authenticated
										? '/book-now'
										: '/loginx'
								}
							>
								{' '}
								<ButtonBookNow
									text='Book Now'
									backgroundColor='#24CD98'
									color='#ffffff'
								/>
							</Link>
						</div>

						<div
							className={
								classes.business_details
							}
						>
							Lorem ipsum dolor sit amet,
							consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor
						</div>

						<div className={classes.wave}>
							<Wave />
						</div>
					</div>
					<EasySteps />

					{this.props.staffAssignments &&
					this.props.staffAssignments.length ? (
						<CarouselSpecialty
							display_select='none'
							specialties={
								this.props.specialties
							}
							staffAssignments={
								this.props.staffAssignments
							}
						/>
					) : null}

					{staffArray && staffArray.length ? (
						<CarouselStaff
							staffArray={staffArray}
						/>
					) : null}
					{this.props.servicesPrices &&
					this.props.servicesPrices.length ? (
						<CarouselService
							home={true}
							servicesPrices={
								this.props.servicesPrices
							}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		admins: state.booking.admins,
		staffAssignments: state.booking.staffAssignments,
		authenticated: state.auth.authenticated,
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
		onfetchSpecialties: () =>
			dispatch(actions.fetchSpecialties()),

		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
		onfetchAdmins: () =>
			dispatch(actions.fetchAdmins()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
