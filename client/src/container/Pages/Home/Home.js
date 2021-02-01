import React, { Component } from 'react';
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
		specialtyArray: [
			{
				specialty: 'Dentist',
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
			},
			{
				specialty: 'Pharmacist',
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
			},
			{
				specialty: 'Mechanic',
				description:
					'Lorem ipsum dolor sit	amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
			},
		],
	};
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
							<ButtonBookNow
								text='Book Now'
								backgroundColor='#24CD98'
								color='#ffffff'
							/>
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
						specialtyArray={
							this.state.specialtyArray
						}
					/>
					<CarouselStaff
						display_select='none'
						photoArray={this.state.photoArray}
					/>
					<CarouselService
						display_select='none'
						serviceArray={
							this.state.serviceArray
						}
					/>
				</div>
			</div>
		);
	}
}

export default MyBookings;
