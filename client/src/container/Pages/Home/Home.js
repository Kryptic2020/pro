import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import WavesSmall from '../../../components/UI/Iconsx/WavesSmall';
import Heading from '../../../components/UI/Heading/Heading';
import ButtonBookNow from '../../../components/UI/ButtonBookNow/ButtonBookNow';
import EasySteps from '../../../components/EasySteps/EasySteps';
import CarouselSpecialty from '../../../components/CarouselSpecialty/CarouselSpecialty';
import CarouselStaff from '../../../components/CarouselStaff/CarouselStaff';
import CarouselService from '../../../components/CarouselService/CarouselService';

class MyBookings extends Component {
	state = {
		isLoading: false,
		serviceArray: [
			{
				service: 'Fillig',
				price: 299,
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
			},
			{
				service: 'HairCut',
				price: 699,
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
			},
			{
				service: 'Tax Return',
				price: 199,
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
			},
		],
		photoArray: [
			{ photo: '', fullName: 'Amanda Powell' },
			{ photo: '', fullName: 'Danielle Powell' },
			{ photo: '', fullName: 'Ruthy Powell' },
		],
	};

	componentDidMount() {
		this.props.onfetchSpecialties();
		this.props.onfetchStaffAssignments();
		this.props.onfetchAdmins();
		this.props.onfetchServicesPrices();
		actions.scrollToTop();
	}
	render() {
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

						<div className={classes.wavesSmall}>
							<WavesSmall />
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
						home={true}
						admins={this.props.admins}
						display_select='none'
						staffAssignments={
							this.props.staffAssignments
						}
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
