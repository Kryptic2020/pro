import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import BookingBar from '../../../components/BookingBar/BookingBar';
import CarouselSpecialty from '../../../components/CarouselSpecialty/CarouselSpecialty';
import CarouselStaff from '../../../components/CarouselStaff/CarouselStaff';
import CarouselService from '../../../components/CarouselService/CarouselService';
import FormDateTime from '../../../components/FormDateTime/FormDateTime';

class BookNow extends Component {
	state = {
		isLoading: false,
		stage: 4,
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
					<Heading text={'User > Book Now'} />
					<div className={classes.box}>
						<div
							className={classes.progressBar}
						>
							<ProgressBar
								stage={this.state.stage}
							/>
						</div>
						{this.state.stage === 1 ? (
							<CarouselSpecialty
								//display_select='none'
								specialtyArray={
									this.state
										.specialtyArray
								}
							/>
						) : null}

						{this.state.stage === 2 ? (
							<CarouselStaff
								photoArray={
									this.state.photoArray
								}
							/>
						) : null}

						{this.state.stage === 3 ? (
							<CarouselService
								serviceArray={
									this.state.serviceArray
								}
							/>
						) : null}

						{this.state.stage === 4 ? (
							<FormDateTime />
						) : null}

						<div className={classes.bookingBar}>
							<BookingBar />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BookNow;
