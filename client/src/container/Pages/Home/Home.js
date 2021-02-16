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

class MyBookings extends Component {
	state = {
		isLoading: false,
	};

	componentDidMount = () => {
		this.props.onfetchSpecialties();
		this.props.onfetchStaffAssignments();
		this.props.onfetchAdmins();
		this.props.onfetchServicesPrices();
		actions.scrollToTop();
	};
	render() {
		let a = [];
		this.props.staffAssignments.map((x) => {
			if (!a.includes(x.staffID)) {
				a.push(x.staffID);
			}
		});
		let staffArray = [];
		a.map((u, index) => {
			this.props.admins.map((z) => {
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
						<div className={classes.header}>
							<Heading
								color='#ffffff'
								text='Hairdresser & Manicurist Appointments'
							/>
						</div>
						<div className={classes.button}>
							<Link to='/book-now'>
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
					<CarouselSpecialty
						display_select='none'
						specialties={this.props.specialties}
						staffAssignments={
							this.props.staffAssignments
						}
					/>
					<CarouselStaff
						staffArray={staffArray}
					/>
					<CarouselService
						home={true}
						servicesPrices={
							this.props.servicesPrices
						}
					/>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		admins: state.booking.admins,
		staffAssignments: state.booking.staffAssignments,
		users: state.auth.users,
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchSpecialties: () =>
			dispatch(actions.fetchSpecialties()),

		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
		onfetchAdmins: () =>
			dispatch(actions.fetchAdmins()),
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyBookings);
